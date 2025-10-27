export default function extractUrl(url: string): string
{
  return new URL(url).pathname.replace(/^\/+/, '');
}
