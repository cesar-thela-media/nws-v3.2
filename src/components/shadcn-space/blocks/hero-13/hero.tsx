"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Official NWS YouTube channel (linked from nws-homes.com footer).
 * Source: https://www.youtube.com/channel/UCeJ8l_IhyNplw76bt0yk4NA
 * Primary: Second Bath Makeover - https://www.youtube.com/watch?v=nSJ_8lzRTjM
 *
 * Note: NWS may disable external embeds at times. We try in-page embed via
 * YouTube IFrame API; onError or timeout falls back to an explicit watch CTA
 * so users never stick on the YouTube "An error occurred" surface alone.
 */
export const NWS_ABOUT_YOUTUBE_ID = "nSJ_8lzRTjM";
export const NWS_ABOUT_YOUTUBE_WATCH = `https://www.youtube.com/watch?v=${NWS_ABOUT_YOUTUBE_ID}`;

type YTPlayer = {
  destroy: () => void;
  playVideo?: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onError?: (e: { data: number }) => void;
        onStateChange?: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState?: { PLAYING: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve, reject) => {
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YT API missing Player"));
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onerror = () => reject(new Error("YT API script failed"));
      document.head.appendChild(tag);
    }

    // If API already mid-load
    const start = Date.now();
    const poll = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(poll);
        resolve(window.YT);
      } else if (Date.now() - start > 8000) {
        window.clearInterval(poll);
        reject(new Error("YT API timeout"));
      }
    }, 50);
  });

  return ytApiPromise;
}

const HeroSection = () => {
  const reactId = useId().replace(/:/g, "");
  const playerHostId = `nws-about-yt-${reactId}`;
  const playerRef = useRef<YTPlayer | null>(null);
  const failTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  /** true = show watch fallback (no stuck YouTube error surface) */
  const [useWatchFallback, setUseWatchFallback] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);

  const clearFailTimer = useCallback(() => {
    if (failTimerRef.current) {
      clearTimeout(failTimerRef.current);
      failTimerRef.current = null;
    }
  }, []);

  const destroyPlayer = useCallback(() => {
    clearFailTimer();
    try {
      playerRef.current?.destroy();
    } catch {
      /* ignore */
    }
    playerRef.current = null;
  }, [clearFailTimer]);

  const activateWatchFallback = useCallback(() => {
    clearFailTimer();
    destroyPlayer();
    setEmbedReady(false);
    setUseWatchFallback(true);
    setIsPlaying(true);
  }, [clearFailTimer, destroyPlayer]);

  const handleClose = useCallback(() => {
    destroyPlayer();
    setIsPlaying(false);
    setUseWatchFallback(false);
    setEmbedReady(false);
  }, [destroyPlayer]);

  const handlePlay = useCallback(() => {
    setUseWatchFallback(false);
    setEmbedReady(false);
    setIsPlaying(true);
  }, []);

  // Mount YT player when playing and not on fallback
  useEffect(() => {
    if (!isPlaying || useWatchFallback) return;

    let cancelled = false;

    const run = async () => {
      // Host node must exist after React paint
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      if (cancelled) return;

      const host = document.getElementById(playerHostId);
      if (!host) {
        activateWatchFallback();
        return;
      }

      try {
        const YT = await loadYouTubeApi();
        if (cancelled) return;

        destroyPlayer();

        // Safety: if player errors or never becomes ready/playing, fall back
        clearFailTimer();
        failTimerRef.current = setTimeout(() => {
          if (!cancelled) activateWatchFallback();
        }, 3500);

        playerRef.current = new YT.Player(playerHostId, {
          videoId: NWS_ABOUT_YOUTUBE_ID,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin:
              typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              setEmbedReady(true);
              try {
                e.target.playVideo?.();
              } catch {
                /* autoplay may still require gesture; click already happened */
              }
              // Keep fail timer; cleared on PLAYING or extended slightly
            },
            onError: () => {
              if (!cancelled) activateWatchFallback();
            },
            onStateChange: (e) => {
              // YT.PlayerState.PLAYING === 1
              if (e.data === 1) {
                clearFailTimer();
                setEmbedReady(true);
              }
              // ENDED === 0 - fine, keep iframe
            },
          },
        });
      } catch {
        if (!cancelled) activateWatchFallback();
      }
    };

    void run();

    return () => {
      cancelled = true;
      destroyPlayer();
    };
  }, [
    isPlaying,
    useWatchFallback,
    playerHostId,
    activateWatchFallback,
    destroyPlayer,
    clearFailTimer,
  ]);

  return (
    <section className="bg-background" data-about-hero-13>
      <div className="relative">
        <div className="relative max-w-7xl mx-auto xl:px-16 lg:px-8 px-4 w-full h-full z-20">
          <div className="flex lg:flex-row flex-col justify-between lg:items-end relative z-1 gap-6 py-10 md:py-16 pt-28 md:pt-32">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary mb-3 !m-0">
                About NWS
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase !m-0">
                Your go-to home builders
              </h1>
            </div>
            <div className="flex group items-center gap-1 shrink-0">
              <Button
                className="px-6 py-3.5 h-auto rounded-[4px] cursor-pointer !text-white"
                render={<a href={`tel:${site.phone.officeTel}`} />}
              >
                Speak to Our Experts
              </Button>
              <Button
                className="p-4 rounded-[4px] h-auto transition-transform duration-300 ease-out group-hover:rotate-45 cursor-pointer !text-white"
                render={<Link href="/services/" />}
                aria-label="View services"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 border-x right-0 pointer-events-none opacity-40">
          <div className="border-r border-border" />
          <div className="border-r border-border" />
          <div className="border-r border-border" />
          <div className="border-r border-border" />
          <div className="border-r border-border" />
          <div />
        </div>
      </div>

      <div className="border-t border-border">
        <div
          className="relative max-w-7xl mx-auto overflow-hidden aspect-video bg-black"
          data-about-video
          data-about-video-mode={
            !isPlaying
              ? "poster"
              : useWatchFallback
                ? "watch-fallback"
                : "embed"
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-home-remodeled-richmond-tx.webp"
            alt="NWS custom home and remodeling in Richmond, TX"
            width={1280}
            height={720}
            className={`absolute inset-0 z-[1] object-cover w-full h-full transition-opacity duration-300 ${
              isPlaying && !useWatchFallback && embedReady
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          />

          {/* YT API mounts iframe inside this host when playing embed mode */}
          {isPlaying && !useWatchFallback ? (
            <div
              id={playerHostId}
              className="absolute inset-0 z-[2] w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
              data-nws-youtube-host={NWS_ABOUT_YOUTUBE_ID}
            />
          ) : null}

          {/* Watch fallback - always a working path to the real NWS video */}
          {isPlaying && useWatchFallback ? (
            <div
              className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-4 bg-black/75 px-6 text-center"
              data-about-video-fallback
            >
              <p className="text-white text-base sm:text-lg max-w-md !m-0 font-medium">
                Watch the NWS project video on YouTube
              </p>
              <p className="text-white/75 text-sm max-w-sm !m-0">
                Second Bath Makeover - official NWS Custom Homes and Remodeling
                channel.
              </p>
              <Button
                className="rounded-[4px] h-12 px-6 !text-white gap-2 text-base"
                render={
                  <a
                    href={NWS_ABOUT_YOUTUBE_WATCH}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-about-video-watch-primary
                  />
                }
              >
                Play on YouTube
                <ArrowUpRight className="size-4" />
              </Button>
              <button
                type="button"
                onClick={handleClose}
                className="text-white/80 text-sm underline bg-transparent border-0 cursor-pointer"
              >
                Back to poster
              </button>
            </div>
          ) : null}

          {!isPlaying ? (
            <div className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play NWS project video"
                data-about-video-play
                className="flex h-16 w-16 lg:h-22 lg:w-22 items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition hover:scale-105 cursor-pointer border-0"
              >
                <Play className="lg:size-8 size-5 text-white" fill="white" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close video"
              data-about-video-close
              className="absolute right-4 top-4 z-[5] flex h-10 w-10 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white cursor-pointer border-0"
            >
              <X className="size-5 text-white" />
            </button>
          )}

          <div
            className={`absolute bottom-6 left-6 right-6 z-[3] md:bottom-10 md:left-10 lg:max-w-xl text-white transition-all duration-300 pointer-events-none ${
              isPlaying
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <p className="text-base sm:text-xl text-white font-normal drop-shadow-md !m-0">
              Full-service custom homes and remodeling in Richmond and nearby
              Fort Bend communities since 2007.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
