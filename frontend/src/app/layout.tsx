import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ULR Shortener",
  description: "Free URL Shortener.",
  openGraph: {
    title: "URL Shortener",
    description: "Free URL Shortener"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-[1.1rem]`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e1e1e',
              color: '#fff',
              border: '1px solid #444',
              padding: '12px 16px',
            },
            success: {
              style: {
                background: '#14532d',
                color: '#d1fae5',
              },
            },
            error: {
              style: {
                background: '#7f1d1d',
                color: '#fee2e2',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
