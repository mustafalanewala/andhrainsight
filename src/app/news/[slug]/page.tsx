"use client";

import { use } from "react";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { fetcher } from "@/lib/fetcher";
import { formatDate, slugifyCategory } from "@/lib/news-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Calendar, User, Clock } from "lucide-react";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);

  const { data, error, isLoading } = useSWR("news-data", fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            వార్తలు లోడ్ చేయడంలో లోపం
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.
          </p>
        </div>
      </div>
    );
  }

  const newsItem = data?.data?.news?.find((item) => item.slug === decodedSlug);

  if (!newsItem) {
    notFound();
  }

  const relatedNews = (data?.data?.news || [])
    .filter(
      (item) =>
        item.categrory_Name === newsItem!.categrory_Name &&
        item.news_Id !== newsItem!.news_Id
    )
    .slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsItem!.news_Title,
          text: newsItem!.news_Content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("లింక్ కాపీ అయింది!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">తిరిగి వెళ్ళు</span>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">పంచుకోండి</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              href={`/category/${slugifyCategory(newsItem!.categrory_Name)}`}
              className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {newsItem!.categrory_Name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
            {newsItem!.news_Title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(newsItem!.insert_Date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{newsItem!.news_Source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 నిమిషాల చదవడం</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={newsItem!.image}
            alt={newsItem!.news_Title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              {newsItem!.news_Content.split("।").map((sentence, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {sentence.trim()}
                  {sentence.trim() && "।"}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>చివరిసారి అప్డేట్ చేయబడింది</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {formatDate(newsItem!.insert_Date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  వర్గం:
                </span>
                <Link
                  href={`/category/${slugifyCategory(
                    newsItem!.categrory_Name
                  )}`}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
                >
                  {newsItem!.categrory_Name}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedNews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-blue-500 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                సంబంధిత కథనాలు
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((article) => (
                <Link
                  key={article.news_Id}
                  href={`/news/${encodeURIComponent(article.slug)}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.news_Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-md shadow-lg">
                        {article.categrory_Name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.news_Title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {article.news_Content.substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium">{article.news_Source}</span>
                      <span>{formatDate(article.insert_Date)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Reading Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
          <div
            className="h-full bg-blue-500 transition-all duration-150"
            style={{ width: "0%" }}
          />
        </div>
      </article>
    </div>
  );
}
