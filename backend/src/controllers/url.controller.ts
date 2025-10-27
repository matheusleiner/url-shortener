import { Request, Response, NextFunction } from "express";
import * as URLService from "../services/url.service";
import IURL from "../interfaces/url";
import extractUrl from "../utils/extract.url";
import buildUrl from "../utils/build.url";
import normalizeAndValidateUrl from "../utils/validate.url";

export async function getOriginalURL(req: Request, res: Response, next: NextFunction): Promise<Response>
{
  const shortenedUrl: string = req.params.url.trim();

  try {
    const urlObject: IURL | null = await URLService.getUrlObjectFromShortenedUrl(shortenedUrl);

    if (!urlObject) return res.status(404).end();

    return res.status(200).json({ urlObject });
  } catch (error) {
    return res.status(500).end();
  }
}

export async function shortenURL(req: Request, res: Response, next: NextFunction): Promise<Response>
{
  let url = req.body.url.trim();

  if (url.endsWith('/')) url = url.slice(0, -1);

  url = normalizeAndValidateUrl(url);

  if (!url) return res.status(400).end();
  
  // verify if url was already shortened
  try {
    const urlObject: IURL | null = await URLService.getUrlObjectFromOriginalUrl(url);

    if (urlObject) {
      const shortenedUrl = buildUrl(urlObject.shortenedUrl);
      return res.status(200).json({ shortenedUrl });
    }
  } catch (error) {
    return res.status(500).end();
  }

  // verify if url is shortened
  try {
    const shortenedUrl = extractUrl(url);

    const urlObject = await URLService.getUrlObjectFromShortenedUrl(shortenedUrl!);

    if (urlObject) {
      const alreadyShortenedUrl = buildUrl(urlObject.shortenedUrl);
      if (alreadyShortenedUrl === url) return res.status(200).json({ message: "already shortened" });
    }
  } catch (error) {
    return res.status(500).end();
  }

  try {
    let shortenedUrl: string | null = await URLService.shortenAndSaveURL(url);
    if (!shortenedUrl) return res.status(500);
    shortenedUrl = buildUrl(shortenedUrl);
    return res.status(201).json({ shortenedUrl });
  } catch (error) {
    return res.status(500).end();
  }
}
