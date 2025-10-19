"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 border-t border-white/10 text-[var(--foreground)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-[var(--foreground)]/80">
            © {currentYear} ఆంధ్ర ఇన్‌సైట్. అన్ని హక్కులుสง్రహించబడ్డాయి.
          </p>
        </div>
      </div>
    </footer>
  );
}
