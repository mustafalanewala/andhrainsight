"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";
import Link from "next/link";

export default function GalleryPage() {
  const { data, error, isLoading } = useSWR("news-data", fetcher);

  const galleries = data?.data?.galleries || [];

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
        <p className="text-[var(--foreground)]">గ్యాలరీలు లోడ్ చేయడంలో లోపం</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">గ్యాలరీ</h1>

        {galleries.length === 0 ? (
          <p className="text-[var(--foreground)]/70">ఇప్పటికే గ్యాలరీలు అందుబాటులో లేవు.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((g: any) => (
              <div key={g.galleryMaster_id} className="bg-white/5 rounded-xl overflow-hidden ring-1 ring-white/10">
                <div className="relative aspect-[4/3]">
                  <Image src={g.image} alt={g.galleryMaster_Title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 line-clamp-2">{g.galleryMaster_Title}</h3>
                  <div className="flex items-center justify-between text-xs text-[var(--foreground)]/70">
                    <span>{new Date(g.insert_Date).toLocaleDateString("te-IN")}</span>
                    <Link href={`#`} className="text-[var(--primary)] font-medium">
                      వీక్షించండి ↗
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
