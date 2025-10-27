export default function normalizeAndValidateUrl(url: string): string | false
{
  const urlRegex = /\b(https?|ftp|file):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?\b(?![\S\s]*\s)/;

  url = url.trim();

  // If url doens't have protocol, add https://
  if (!/^(https?|ftp|file):\/\//i.test(url)) {
    url = "https://" + url;
  }

  if (!urlRegex.test(url)) {
    return false;
  }

  return url;
}
