import type { Metadata } from "next";
import { Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";

const teluguFont = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-telugu",
});

export const metadata: Metadata = {
  title: "ఆంధ్ర ఇన్‌సైట్ | Andhra Insight",
  description:
    "ఆంధ్ర ఇన్‌సైట్ (Andhra Insight) — ఆంధ్రప్రదేశ్ తాజా వార్తలు, రాజకీయాలు, వినోదం, క్రీడలు, టెక్ మరియు స్థానిక వార్తలను తెలుగులో త్వరితంగా మీ ముందుకు తీసుకువస్తాం.",
  keywords:
    "Andhra Pradesh, Telugu News, ఆంధ్ర వార్తలు, రాజకీయాలు, వినోదం, క్రీడలు, టెక్, స్థానిక వార్తలు",
  authors: [{ name: "Andhra Insight" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={teluguFont.variable}>
      <body className="font-sans antialiased bg-[var(--background)]">
        <div className="min-h-screen flex flex-col">
          <Ticker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
