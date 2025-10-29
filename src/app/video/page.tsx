"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";
import Image from "next/image";

export default function VideoPage() {
  const { data, error, isLoading } = useSWR("news-data", fetcher);

  const videos = data?.data?.videos || [];

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
        <p className="text-[var(--foreground)]">వీడియోలు లోడ్ చేయడంలో లోపం</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">
          వీడియోలు
        </h1>

        {videos.length === 0 ? (
          <p className="text-[var(--foreground)]/70">
            ఇప్పటికే వీడియోలు అందుబాటులో లేవు.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v: any) => (
              <div
                key={v.videoDetail_id}
                className="bg-white/5 rounded-xl overflow-hidden ring-1 ring-white/10"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={v.image}
                    alt={v.videoTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
                    {v.videoTitle}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[var(--foreground)]/70">
                    <span>
                      {new Date(v.insert_Date).toLocaleDateString("te-IN")}
                    </span>
                    <Link
                      href={v.fileName}
                      target="_blank"
                      className="text-[var(--primary)] font-medium"
                    >
                      చూడండి ↗
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
