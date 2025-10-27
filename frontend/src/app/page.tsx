"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChain, faQrcode, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";

export default function Home()
{
  const [mode, setMode] = useState<"url" | "qrcode">("url");
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const urlRegex = /\b(https?|ftp|file):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?\b(?![\S\s]*\s)/;

  function normalizeAndValidateUrl(url: string): string | false {
    url = url.trim();

    // If doens"t have protocol, add https://
    if (!/^(https?|ftp|file):\/\//i.test(url)) {
      url = "https://" + url;
    }

    if (!urlRegex.test(url)) {
      return false;
    }

    return url;
  }

  async function submitForm(): Promise<void> {
    if (!url) { toast.error("Please enter a URL."); return; }

    const validatedUrl: string | false = normalizeAndValidateUrl(url);

    if (!validatedUrl) { toast.error("Invalid URL."); return; }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: validatedUrl })
      });

      if (response.status === 400) { toast.error("Invalid URL."); return; }
      if (response.status === 500) { toast.error("Server error."); return; }

      const data = await response.json();

      if (data.message === "already shortened") { toast("Already shortened."); return; }

      setShortenedUrl(data.shortenedUrl);
    } catch (error) {
      toast.error("Unknown error.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(): Promise<void> {
    if (mode === "url") await submitForm();
  }

  async function copyToClipboard(text: string) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Could not copy");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col md:justify-center items-center pt-12 md:pt-0 bg-[#050505]">

      <Image src={"/logo.png"} alt="Link icon." width={512} height={512} className="w-20 rounded-md" />

      <h1 className="text-3xl font-extrabold py-3 tracking-tight bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
        {mode === "url" ? "URL Shortener" : "QR Code Generator"}
      </h1>

      <main className="main bg-[#0f1720] max-w-xl w-[95vw] px-4 pt-2 pb-0 rounded-2xl border border-[rgba(255,255,255,0.03)]">

        <div className="flex gap-4 px-2 pb-1 pt-2 items-center">

          <input
            type="radio"
            name="mode"
            id="mode-url"
            value="url"
            checked={mode === "url"}
            onChange={() => setMode("url")}
          />

          <input
            type="radio"
            name="mode"
            id="mode-qrcode"
            value="qrcode"
            checked={mode === "qrcode"}
            onChange={() => setMode("qrcode")}
          />

          <div className="w-full flex flex-row justify-around p-0">
            <label
              htmlFor="mode-url"
              className={`cursor-pointer text-2xl w-full text-center p-3 rounded-lg transition-transform duration-150 ${mode === "url" ? "bg-[var(--glass)] -translate-y-1" : ""}`}
              aria-label="Shorten URL"
            >
              <FontAwesomeIcon icon={faChain} />
            </label>

            <label
              htmlFor="mode-qrcode"
              className={`cursor-pointer text-2xl w-full text-center p-3 rounded-lg transition-transform duration-150 ${mode === "qrcode" ? "bg-[var(--glass)] -translate-y-1" : ""}`}
              aria-label="Generate QR Code"
            >
              <FontAwesomeIcon icon={faQrcode} />
            </label>
          </div>
        </div>

        <div className="bg-[#0b0f14] p-4 rounded-2xl">

          <h2 className="text-2xl font-semibold pb-2">
            {mode === "url" ? "Shorten URL" : "Generate QR Code"}
          </h2>
          
          <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} className="w-full flex flex-col gap-3">
            <label htmlFor="link" className="text-neutral-400">
              Paste your long link here
            </label>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <input
                type="text"
                name="link"
                id="link"
                placeholder="https://example.com/very-long-url"
                required
                autoComplete="off"
                spellCheck="false"
                autoFocus
                maxLength={2048}
                onChange={(event) => setUrl(event.target.value)}
                className="w-full h-[50px] text-[1.05rem] bg-[#0b1220] focus:outline-none focus:border-[rgba(96,165,250,0.6)] border border-[rgba(255,255,255,0.04)] text-[#ededed]"
              />
              
              {mode === "url" && (
                <button
                  type="submit"
                  className={`w-full md:w-3/12 h-[50px] btn flex items-center justify-center text-white font-semibold border-none cursor-pointer`}
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <Image src={"/loading.gif"} alt="Loading" width={136} height={48} unoptimized className="p-0 m-0" />
                  ) : (
                    "Shorten"
                  )}
                </button>
              )}
            </div>
          </form>

          {mode === "url" && (
            <div className="w-full px-0 py-4">
              <div className="w-full output">
                <output
                  style={{ scrollbarWidth: "none" }}
                  className={`w-full overflow-x-scroll pl-2 ${shortenedUrl ? "shortened-gradient" : "text-[#9aa4b2]"}`}
                >
                  {shortenedUrl || "Your shortened link will appear here after shortening."}
                </output>
                <button
                  className="copy-btn bg-transparent text-[#ededed] border border-[rgba(255,255,255,0.04)] cursor-pointer"
                  onClick={() => copyToClipboard(shortenedUrl)}
                  aria-label="Copy shortened link"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
            </div>
          )}

          {mode === "qrcode" && (
            <div className="w-full flex justify-center pt-4">
              <div className="qr-wrap p-4">
                <QRCodeSVG value={url} size={250} level="L" bgColor="#8091a3" />
              </div>
            </div>
          )}
        </div>

        <footer className="w-full p-0.5 text-center">
          <a href="https://github.com/matheusleiner/url-shortener" target="_blank" className="text-blue-400 hover:underline">
            GitHub
          </a>
        </footer>

      </main>
    </div>
  );
}
