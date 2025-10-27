import IURL from "../interfaces/url";
import URLModel from "../models/url.model";
import fetchMetadata from "../utils/fetch.metadata";
import generateURL from "../utils/generate.url";

export async function getUrlObjectFromShortenedUrl(shortenedUrl: string): Promise<IURL | null>
{
  if (shortenedUrl.endsWith('/')) shortenedUrl = shortenedUrl.slice(0, -1);

  const urlObject: IURL | null = await URLModel.findOne({ shortenedUrl }).select("-_id -__v -createdAt -updatedAt");

  return urlObject;
}

export async function getUrlObjectFromOriginalUrl(originalUrl: string): Promise<IURL | null>
{
  const trimmed = originalUrl.trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed);
  originalUrl = hasScheme ? trimmed : `https://${trimmed}`;
  if (originalUrl.endsWith('/')) originalUrl = originalUrl.slice(0, -1);

  const urlObject: IURL | null = await URLModel.findOne({ originalUrl }).select("-_id -__v -createdAt -updatedAt");

  return urlObject;
}

export async function shortenAndSaveURL(originalUrl: string): Promise<string>
{
  let shortenedUrl: string = "";

  do {
    shortenedUrl = generateURL();
  } while (await URLModel.findOne({ shortenedUrl }));

  const metadata = await fetchMetadata(originalUrl);

  try {
    await new URLModel({ originalUrl, shortenedUrl, metadata }).save();
  } catch (error: any) {
    throw new Error(error);
  }

  return shortenedUrl;
}
