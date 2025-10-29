"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";

export default function BlogPage() {
  const { data, error, isLoading } = useSWR("news-data", fetcher);

  const blogs = data?.data?.news || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--foreground)]">బ్లాగ్‌లు లోడ్ చేయడంలో లోపం</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">
          బ్లాగ్‌లు
        </h1>

        {blogs.length === 0 ? (
          <p className="text-[var(--foreground)]/70">
            ఇప్పటికే బ్లాగ్‌లు అందుబాటులో లేవు.
          </p>
        ) : (
          <div className="space-y-6">
            {blogs.map((b) => (
              <article
                key={b.news_Id}
                className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  {b.news_Title}
                </h3>
                <p className="text-[var(--foreground)]/70 mb-4 line-clamp-3">
                  {b.news_Content.substring(0, 220)}...
                </p>
                <div className="flex items-center justify-between text-sm text-[var(--foreground)]/70">
                  <span>
                    {new Date(b.insert_Date).toLocaleDateString("te-IN")}
                  </span>
                  <Link
                    href={`/news/${encodeURIComponent(b.slug)}`}
                    className="text-[var(--primary)] font-medium"
                  >
                    పఠించండి ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
