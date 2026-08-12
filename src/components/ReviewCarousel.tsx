"use client";

import { useState } from "react";
import { reviews } from "@/data/reviews";

export function ReviewCarousel() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const start = page * perPage;
  const visible = reviews.slice(start, start + perPage);

  function prev() {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }
  function next() {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map((r) => (
          <article
            key={`${r.name}-${r.date}`}
            className="bg-white rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.avatar}
                alt="NWS client testimonial"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-background shadow-sm"
              />
              <div>
                <div className="font-semibold text-foreground">
                  {r.name}
                </div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
            </div>
            <div className="stars mb-3">★★★★★</div>
            <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
              {r.text}
            </p>
            <div className="mt-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">
              {r.source}
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)] text-[var(--color-heading)]"
          aria-label="Previous reviews"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === page ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)] text-[var(--color-heading)]"
          aria-label="Next reviews"
        >
          ›
        </button>
      </div>
    </div>
  );
}
