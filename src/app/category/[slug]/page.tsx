"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { NewsItem } from "@/lib/types";
import {
  formatDate,
  getCategoryFromSlug,
  filterByCategory,
} from "@/lib/news-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, error, isLoading } = useSWR("news-data", fetcher);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            వర్గం లోడ్ అవుతోంది...
          </h2>
          <p className="text-[var(--primary)]">దయచేసి వేచి ఉండండి</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            వార్తలు లోడ్ చేయడంలో లోపం
          </h1>
          <p className="text-[var(--foreground)]/70 mb-6">
            దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:opacity-90 transition-colors duration-300"
          >
            మళ్లీ ప్రయత్నించండి
          </button>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryFromSlug(data?.data?.news || [], slug);
  const categoryNews = filterByCategory(data?.data?.news || [], slug);

  if (categoryNews.length === 0) {
    notFound();
  }

  // Pagination logic
  const totalItems = categoryNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = categoryNews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative z-10">
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm py-4">
              <Link
                href="/"
                className="text-[var(--primary)] hover:opacity-90 transition-colors duration-300 font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                హోమ్
              </Link>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-[var(--foreground)] font-semibold">
                {categoryName}
              </span>
            </nav>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-[var(--foreground)]/70 text-sm">
              {startIndex + 1}-{Math.min(endIndex, totalItems)} మొత్తం{" "}
              {totalItems}
            </p>
          </div>

          {paginatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedNews.map((article, index) => (
                <div
                  key={article.news_Id}
                  className="group rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.news_Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs font-medium rounded-md">
                        {article.categrory_Name}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-[var(--foreground)]/60 text-xs font-medium">
                        {formatDate(article.insert_Date)}
                      </span>
                    </div>

                    <Link href={`/news/${encodeURIComponent(article.slug)}`}>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2 leading-tight">
                        {article.news_Title}
                      </h3>
                    </Link>

                    <p className="text-[var(--foreground)]/70 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {article.news_Content}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[var(--foreground)]/60 text-xs font-medium">
                        {article.news_Source}
                      </span>
                      <Link
                        href={`/news/${encodeURIComponent(article.slug)}`}
                        className="text-[var(--primary)] hover:opacity-90 text-xs font-semibold transition-colors duration-200 flex items-center"
                      >
                        చదవండి
                        <svg
                          className="ml-1 w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-[var(--foreground)]/60 text-lg">
                ఈ వర్గంలో వ్యాసాలు లభించలేదు.
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
