"use client";

import { useEffect, useState } from "react";
import profile from "@/content/profile.json";

/**
 * Renders /public/profile.jpg if it exists; falls back to an initials
 * avatar otherwise. To add your real photo: drop a file at
 * frontend/public/profile.jpg and it swaps in automatically, no code
 * change required.
 *
 * Deliberately does NOT rely on <img onError> -- when the file is
 * missing, the native error event fires almost instantly (a local 404),
 * often before React finishes hydrating and attaches the handler, so
 * onError can silently never fire. Instead this preloads via a plain
 * Image() in an effect and only renders the <img> once loading is
 * confirmed to succeed.
 */
export default function ProfilePhoto({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
    img.src = "/profile.jpg";
  }, []);

  if (!loaded) {
    return (
      <div
        className={`flex items-center justify-center bg-surface font-display text-6xl text-slate ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, no next/image optimizer needed
    <img src="/profile.jpg" alt={profile.name} className={`object-cover ${className}`} />
  );
}
