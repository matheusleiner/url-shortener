export default function buildUrl(url: string): string | null
{  
  const domain: string = process.env.FRONTEND_URL!;

  try {
    // Garante que o domínio termina com uma barra ou não, dependendo do caminho
    const domainWithSlash = domain.endsWith('/') ? domain.slice(0, -1) : domain;
    const urlPath = url.startsWith('/') ? url : '/' + url;

    return new URL(urlPath, domainWithSlash).toString();
  } catch (error) {
    console.error(error);
    return null;
  }
}
