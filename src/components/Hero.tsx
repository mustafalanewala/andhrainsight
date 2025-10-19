"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { NewsItem } from "@/lib/types";
import Image from "next/image";

export default function Hero() {
  const { data, error, isLoading } = useSWR("news-data", fetcher);
  const [currentIndex, setCurrentIndex] = useState(0);

  const news: NewsItem[] = useMemo(() => {
    if (!data?.data?.news) return [];
    return data.data.news
      .slice()
      .sort(
        (a, b) =>
          new Date(b.insert_Date).getTime() - new Date(a.insert_Date).getTime()
      );
  }, [data]);

  // Auto-rotate featured stories
  useEffect(() => {
    if (news.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(news.length, 5));
    }, 6000);
    return () => clearInterval(timer);
  }, [news.length]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10" />
        <div className="text-center z-10">
          <div className="w-24 h-24 border-4 border-[var(--primary)] border-t-[var(--accent)] rounded-full animate-spin mx-auto mb-8" />
          <h2 className="text-3xl font-black text-[var(--foreground)] mb-4">
            ఆంధ్ర ఇన్‌సైట్
          </h2>
          <p className="text-xl text-[var(--foreground)]/70">
            వార్తలు లోడ్ అవుతున్నాయి...
          </p>
        </div>
      </section>
    );
  }

  if (!news || news.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[var(--foreground)] mb-4">
            వార్తలు అందుబాటులో లేవు
          </h2>
          <p className="text-lg text-[var(--foreground)]/60">
            దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి
          </p>
        </div>
      </section>
    );
  }

  const featuredStories = news.slice(0, 5);
  const currentStory = featuredStories[currentIndex];
  const sideStories = news.slice(5, 8);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(30,164,255,0.1),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(155,89,255,0.1),_transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main Featured Story */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Large Featured Card */}
          <div className="lg:col-span-2 relative group">
            <Link href={`/news/${encodeURIComponent(currentStory.slug)}`}>
              <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={currentStory.image}
                  alt={currentStory.news_Title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-bold rounded-full">
                        {currentStory.categrory_Name}
                      </span>
                      <span className="text-white/80 text-sm">
                        {new Date(currentStory.insert_Date).toLocaleDateString(
                          "te-IN",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <h1 className="text-4xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
                      {currentStory.news_Title}
                    </h1>

                    <p className="text-base text-white/90 leading-relaxed mb-6 max-w-2xl">
                      {currentStory.news_Content.substring(0, 200)}...
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-[var(--primary)] font-bold text-lg">
                        చదవండి →
                      </span>
                      <div className="flex gap-2">
                        {featuredStories.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentIndex(idx);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              idx === currentIndex
                                ? "bg-[var(--primary)] scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Stories */}
          <div className="space-y-6">
            {sideStories.map((story, index) => (
              <Link
                key={story.news_Id}
                href={`/news/${encodeURIComponent(story.slug)}`}
                className="group block"
              >
                <div className="relative h-40 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 hover:scale-105">
                  <Image
                    src={story.image}
                    alt={story.news_Title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-1 bg-[var(--secondary)] text-white text-xs font-bold rounded-full mb-2">
                      {story.categrory_Name}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">
                      {story.news_Title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Topics Bar */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-[var(--secondary)] rounded-full animate-pulse" />
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              ట్రెండింగ్ టాపిక్స్
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {news.slice(9, 14).map((item) => (
              <Link
                key={item.news_Id}
                href={`/news/${encodeURIComponent(item.slug)}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[var(--foreground)]/80 hover:text-[var(--foreground)] rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {item.news_Title.substring(0, 30)}...
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
