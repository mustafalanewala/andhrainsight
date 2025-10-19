export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm py-4">
            <a
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
            </a>
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
              గోప్యతా విధానం
            </span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6">
              గోప్యతా విధానం
            </h1>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              మీ వ్యక్తిగత సమాచారాన్ని మేము ఎలా సేకరిస్తాం, ఉపయోగిస్తాం మరియు
              రక్షిస్తామో తెలుసుకోండి
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-[var(--foreground)]/80 leading-relaxed space-y-6">
              <p className="text-lg">
                ఆంధ్ర ఇన్‌సైట్ మీ గోప్యతను గౌరవిస్తుంది. ఈ విధానం ద్వారా మీ
                సమాచారాన్ని ఎలా సేకరిస్తాం, ఎలా ఉపయోగిస్తాం మరియు ఎలా
                రక్షిస్తామో వివరించబడుతుంది.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                సమాచారం సేకరణ
              </h2>
              <p>మేము క్రింది సమాచారాన్ని సేకరించవచ్చు:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>మీ IP చిరునామా మరియు బ్రౌజర్ వివరాలు</li>
                <li>మీరు సందర్శించే పేజీలు</li>
                <li>సమయం మరియు తేదీ సమాచారం</li>
                <li>కుకీల ద్వారా సేకరించిన సమాచారం</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                సమాచారం వినియోగం
              </h2>
              <p>
                సేకరించిన సమాచారాన్ని మేము క్రింది ప్రయోజనాల కోసం ఉపయోగిస్తాము:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>సైట్ పనితీరును మెరుగుపరచడానికి</li>
                <li>వినియోగదారుల అనుభవాన్ని వ్యక్తిగతీకరించడానికి</li>
                <li>వార్తలు మరియు అప్డేట్స్ పంపడానికి</li>
                <li>సాంకేతిక సమస్యలను పరిష్కరించడానికి</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                సమాచారం పంచుకోటం
              </h2>
              <p>
                మీ వ్యక్తిగత సమాచారాన్ని మేము మూడో పక్షాలతో పంచుకోము. అయితే
                చట్టం ప్రకారం లేదా సేవల కోసం అవసరమైనప్పుడు మాత్రమే పంచుకోవచ్చు.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                కుకీల వినియోగం
              </h2>
              <p>
                మా సైట్ కుకీలను ఉపయోగిస్తుంది. మీరు బ్రౌజర్ సెట్టింగ్స్ ద్వారా
                కుకీలను నియంత్రించవచ్చు. అలా చేస్తే కొన్ని ఫీచర్లు
                ప్రభావితమవచ్చు.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                సమాచారం రక్షణ
              </h2>
              <p>
                మీ సమాచార భద్రత మా ప్రాధాన్యం. మేము తగిన భద్రతా చర్యలను
                అనుసరిస్తాము.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మీ హక్కులు
              </h2>
              <p>మీకు క్రింది హక్కులు ఉన్నాయి:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>మీ డేటాను యాక్సెస్ చేయడం</li>
                <li>సరిదిద్దడం</li>
                <li>తొలగించడం</li>
                <li>ప్రాసెసింగ్‌ను పరిమితం చేయడం</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మార్పులు
              </h2>
              <p>
                మేము ఈ విధానాన్ని కాలానుగుణంగా నవీకరించవచ్చు. ముఖ్యమైన మార్పులను
                సైట్‌లో తెలియజేస్తాము.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                సంప్రదించండి
              </h2>
              <p>
                ఈ విధానం గురించి మీకు ఏ ప్రశ్నలైనా ఉంటే, దయచేసి మమ్మల్ని
                సంప్రదించండి.
              </p>

              <div className="bg-white/5 rounded-lg p-6 mt-8 ring-1 ring-white/10">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  మా గోప్యత
                </h3>
                <p className="text-[var(--foreground)]/80">
                  మీ నమ్మకాన్ని కాపాడటం మా బాధ్యత.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
