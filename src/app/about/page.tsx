export default function AboutPage() {
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
              మన గురించి
            </span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6">
              ఆంధ్ర ఇన్‌సైట్ గురించి
            </h1>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              ఆంధ్రప్రదేశ్ వార్తలను వేగంగా, నమ్మదగిన విధంగా మీకు అందించడం మా
              లక్ష్యం
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-[var(--foreground)]/80 leading-relaxed space-y-6">
              <p className="text-lg">
                ఆంధ్ర ఇన్‌సైట్ — ఆంధ్రప్రదేశ్‌కు సంబంధించిన తాజా వార్తలు,
                రాజకీయాలు, వినోదం, క్రీడలు, టెక్ మరియు స్థానిక వార్తలను తెలుగులో
                మీకు అందించే డిజిటల్ ప్లాట్‌ఫార్మ్.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మా లక్ష్యం
              </h2>
              <p>
                ప్రతి పాఠకుడికి సమయానుకూలంగా, స్పష్టంగా, నమ్మదగిన వార్తలను
                తెలుగులో అందించడం. ప్రభుత్వ విధానాలు, ఆర్థికం, సంస్కృతి, సమాజం,
                టెక్నాలజీ వంటి రంగాల్లో విస్తృత కవరేజ్.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మా విలువలు
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>నిజనిర్ధారణ:</strong> ప్రచురణకు ముందు ఫాక్ట్-చెక్
                </li>
                <li>
                  <strong>నిష్పాక్షికత:</strong> పక్షపాతం లేని కవరేజ్
                </li>
                <li>
                  <strong>వేగం:</strong> త్వరితమైన అప్డేట్స్
                </li>
                <li>
                  <strong>సమాజ బాధ్యత:</strong> పాఠకుల ప్రయోజనం ముందు
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మా టీమ్
              </h2>
              <p>
                అనుభవజ్ఞులైన జర్నలిస్టులు, ఎడిటర్లు, డిజిటల్ క్రియేటర్స్‌తో
                కూడిన బృందం. ఆంధ్రప్రదేశ్ అంతటా ఉన్న పట్టణాలు, గ్రామాల నుంచి
                స్థానిక కంటెంట్.
              </p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                మా ప్రయత్నాలు
              </h2>
              <p>
                వార్తలతో పాటు ప్రజా ప్రయోజన కార్యక్రమాలు, అవగాహన వ్యాసాలు,
                ప్రత్యేక కథనాలు అందిస్తాము.
              </p>

              <div className="bg-white/5 rounded-lg p-6 mt-8 ring-1 ring-white/10">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  మాతో కలసి ముందుకు
                </h3>
                <p className="text-[var(--foreground)]/80">
                  మీ సూచనలు, కథనాలు, ఫీడ్‌బ్యాక్‌ను మాతో పంచుకోండి. కలిసి మంచి
                  జర్నలిజాన్ని నిర్మిద్దాం.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
