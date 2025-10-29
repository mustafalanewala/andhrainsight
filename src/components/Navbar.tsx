"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import { getCategories, slugifyCategory } from "@/lib/news-utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data } = useSWR("news-data", fetcher);
  const categories = getCategories(data?.data?.news || []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--primary)] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, categories, and menu */}
        <div className="flex justify-between md:grid md:grid-cols-3 items-center py-4">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                ఆంధ్ర ఇన్‌సైట్
              </span>
            </Link>
          </div>

          <div className="justify-self-center hidden md:flex space-x-6">
            <Link
              href="/gallery"
              className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-200",
                "text-white/90 hover:text-white hover:underline underline-offset-8 decoration-white/40"
              )}
            >
              గ్యాలరీ
            </Link>

            <Link
              href="/video"
              className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-200",
                "text-white/90 hover:text-white hover:underline underline-offset-8 decoration-white/40"
              )}
            >
              వీడియో
            </Link>

            <Link
              href="/blog"
              className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-200",
                "text-white/90 hover:text-white hover:underline underline-offset-8 decoration-white/40"
              )}
            >
              బ్లాగ్
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)
                }
                className={cn(
                  "font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-1",
                  "text-white/90 hover:text-white hover:underline underline-offset-8 decoration-white/40"
                )}
              >
                వర్గాలు
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isCategoriesDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${slugifyCategory(category)}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] transition-colors duration-200"
                      onClick={() => setIsCategoriesDropdownOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="justify-self-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:opacity-90"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="flex flex-col space-y-3 py-4 border-t border-white/10">
            <div className="md:hidden">
              <Link
                href="/gallery"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                గ్యాలరీ
              </Link>

              <Link
                href="/video"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                వీడియో
              </Link>

              <Link
                href="/blog"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                బ్లాగ్
              </Link>

              {/* Mobile Categories Section */}
              <div className="border-t border-white/20 pt-3 mt-3">
                <button
                  onClick={() =>
                    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)
                  }
                  className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 flex items-center justify-between w-full"
                >
                  వర్గాలు
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isCategoriesDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/category/${slugifyCategory(category)}`}
                        className="font-medium text-base text-white/80 hover:text-white transition-colors duration-200 py-1 block"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsCategoriesDropdownOpen(false);
                        }}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3 space-y-3">
              <Link
                href="/about"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                మన గురించి
              </Link>
              <Link
                href="/privacy"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                గోప్యతా విధానం
              </Link>
              <Link
                href="/contact"
                className="font-medium text-lg text-white hover:text-white/90 transition-colors duration-200 py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                సంప్రదించండి
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
