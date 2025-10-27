import * as cheerio from "cheerio";
import axios from "axios";
import IMetadata from "../interfaces/metadata";

export default async function fetchMetadata(url: string): Promise<IMetadata | null>
{
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetadataBot/1.0)',
      },
      timeout: 10000,
      responseType: 'text',
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const metadata: IMetadata = {
      site_name: $('meta[property="og:site_name"]').attr('content'),
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description:
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      image_alt: $('meta[property="og:image:alt"]').attr('content'),
      video: $('meta[property="og:video"]').attr('content'),
      audio: $('meta[property="og:audio"]').attr('content'),
      url: $('meta[property="og:url"]').attr('content') || url
    };

    return metadata;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      console.error("Request timed out after 10 seconds");
    } else {
      console.error("Error fetching metadata:", error.message);
    }
    return null;
  }
}
