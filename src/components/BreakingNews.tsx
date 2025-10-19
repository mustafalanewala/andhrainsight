"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { NewsItem } from "@/lib/types";
import Ad from "./Ad";
import Image from "next/image";

export default function BreakingNews() {
  const { data, error, isLoading } = useSWR("news-data", fetcher);

  const allNews = (data?.data?.news || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.insert_Date).getTime() - new Date(a.insert_Date).getTime()
    );
  const breakingNews = allNews.slice(0, 8); // Reduced from 15 to 8

  if (isLoading || breakingNews.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tight">
            బ్రేకింగ్ న్యూస్
          </h2>
          <p className="text-base text-[var(--foreground)]/60 max-w-xl mx-auto">
            తాజా అప్డేట్స్ మరియు హాట్ స్టోరీలు
          </p>
        </div>

        {/* Simple grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {breakingNews.map((news, index) => (
            <Link
              key={news.news_Id}
              href={`/news/${encodeURIComponent(news.slug)}`}
              className="group block"
            >
              <div className="bg-white/5 rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.news_Title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-[var(--primary)] text-white text-xs font-semibold rounded-full mb-2">
                    {news.categrory_Name}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2 leading-tight">
                    {news.news_Title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/70 line-clamp-2 mb-3">
                    {news.news_Content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--foreground)]/60">
                    <span>{news.news_Source}</span>
                    <span>
                      {new Date(news.insert_Date).toLocaleDateString("te-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom ad */}
        <div className="mt-12">
          <Ad slot="breaking-news-bottom" format="banner" />
        </div>
      </div>
    </section>
  );
}
