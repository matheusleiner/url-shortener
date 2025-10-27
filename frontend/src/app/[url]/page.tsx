import { Metadata } from "next";
import { JSX } from "react";

// Generate dynamic metadata for SEO / Open Graph
export async function generateMetadata({ params }: { params: Promise<{ url: string }> }): Promise<Metadata> {
  const { url } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${encodeURIComponent(url)}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        title: response.status === 404 ? "Not Found" : "Server Error",
        description: "This short URL could not be resolved.",
        robots: { index: false, follow: false }
      };
    }

    const data = await response.json();
    const metadata = data.urlObject?.metadata ?? {};

    return {
      title: metadata.title,
      description: metadata.description ,
      robots: { index: false, follow: false },
      openGraph: {
        siteName: metadata.site_name,
        title: metadata.title,
        description: metadata.description,
        images: metadata.image ? [metadata.image] : [],
        videos: metadata.video ? [metadata.video] : [],
        url: metadata.url
      }
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Error",
      description: "Could not fetch metadata",
      robots: { index: false, follow: false }
    };
  }
}

// Main page component for redirecting
export default async function RedirectPage({ params }: { params: Promise<{ url?: string }> }): Promise<JSX.Element> {
  const { url } = await params;

  if (!url) {
    return <div>No url code found in URL</div>;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${encodeURIComponent(url)}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      if (response.status === 404) return <div>Not found.</div>;
      return <div>Server error.</div>;
    }

    const data = await response.json();
    const target = data.urlObject?.originalUrl;

    if (!target) {
      return <div>Target URL not found.</div>;
    }

    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <meta httpEquiv="refresh" content={`0;url=${target}`}></meta>
        <p>
          If you weren't redirect automatically, <a href={target} className="text-blue-500 underline">click here</a>
        </p>
      </div>
    )
  } catch (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <main>
          An error ocurred.
        </main>
      </div>
    );
  }
}
