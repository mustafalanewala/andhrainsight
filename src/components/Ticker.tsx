"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Ticker() {
  const { data } = useSWR("news-data", fetcher);

  const latestNews = (data?.data?.news || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.insert_Date).getTime() - new Date(a.insert_Date).getTime()
    )
    .slice(0, 8);

  if (latestNews.length === 0) return null;

  return (
    <div className="bg-gray-800 text-white py-2 px-4 relative overflow-hidden">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        {/* Breaking news indicator */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wide">
            బ్రేకింగ్ న్యూస్
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
            {latestNews.map((news) => (
              <Link
                key={news.news_Id}
                href={`/news/${encodeURIComponent(news.slug)}`}
                className="inline-block text-sm hover:text-yellow-200 transition-colors duration-200 hover:underline"
              >
                {news.news_Title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
