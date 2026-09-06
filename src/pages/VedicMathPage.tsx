import React, { useState } from "react";
import { WandSparkles, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { vedicSutrasData } from "../data/vedicData";
import { useApp } from "../context/AppContext";

export const VedicMathPage: React.FC = () => {
  const [activeSutraNo, setActiveSutraNo] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const { addPoints } = useApp();

  // Quick Vedic Calculator state
  const [calcNum, setCalcNum] = useState<number>(35);

  const currentSutra =
    vedicSutrasData.find((s) => s.no === activeSutraNo) || vedicSutrasData[0];

  const handleQuizAnswer = (qIdx: number, optIdx: number, ansIdx: number) => {
    const key = `${activeSutraNo}-${qIdx}`;
    if (userAnswers[key] !== undefined) return;
    setUserAnswers((prev) => ({ ...prev, [key]: optIdx }));
    if (optIdx === ansIdx) {
      addPoints(10);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <WandSparkles size={16} />
          <span>प्राचीन भारतीय 16 मूल सूत्र</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          वैदिक गणित 🕉️
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          स्वामी भारती कृष्ण तीर्थ जी द्वारा अथर्ववेद से उद्घाटित 16 जादुई सूत्र, जिनसे बड़ी-बड़ी गणनाएं सेकंडों में हल होती हैं!
        </p>
      </div>

      {/* Quick Interactive Tool: Ekadhikena Purvena Square Calculator */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white font-heading text-xs px-3 py-1 rounded-full uppercase">
              लाइव सूत्र 1 कैलकुलेटर
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold mt-1">
              5 पर समाप्त होने वाली संख्या का वर्ग (n5)²
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/90 mt-0.5">
              नियम: n × (n + 1) के आगे 25 लिख दें!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 p-2.5 rounded-2xl border border-white/30">
            <span className="font-heading text-sm font-bold">संख्या:</span>
            <select
              value={calcNum}
              onChange={(e) => setCalcNum(parseInt(e.target.value, 10))}
              className="bg-white text-orange-900 font-heading text-base font-extrabold px-3 py-1.5 rounded-xl focus:outline-none"
            >
              {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="font-heading text-lg font-bold">² =</span>
            <span className="font-mono text-2xl font-black text-yellow-300">
              {calcNum * calcNum}
            </span>
          </div>
        </div>

        {/* Step Breakdown */}
        {(() => {
          const n = Math.floor(calcNum / 10);
          return (
            <div className="mt-4 pt-3 border-t border-white/20 text-xs font-body flex flex-wrap gap-4 text-white/95">
              <span><strong>बायाँ भाग:</strong> {n} × ({n} + 1) = {n} × {n + 1} = <strong>{n * (n + 1)}</strong></span>
              <span><strong>दायाँ भाग:</strong> 5² = <strong>25</strong></span>
              <span><strong>उत्तर:</strong> {n * (n + 1)}25 = <strong>{calcNum * calcNum}</strong> ✅</span>
            </div>
          );
        })()}
      </div>

      {/* Main Grid: 16 Sutras Sidebar & Sutra Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sutra Selection List */}
        <div className="lg:col-span-4 space-y-1.5">
          <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground px-2 mb-2">
            16 वैदिक सूत्र सूची
          </h3>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {vedicSutrasData.map((s) => {
              const isSelected = activeSutraNo === s.no;
              return (
                <button
                  key={s.no}
                  onClick={() => setActiveSutraNo(s.no)}
                  className={`w-full text-left p-3 rounded-2xl font-body transition-all flex items-center justify-between border ${
                    isSelected
                      ? "bg-amber-500 text-white border-amber-500 shadow-md font-bold"
                      : "bg-card text-foreground hover:bg-muted border-border"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-heading text-xs font-bold flex-shrink-0 ${
                        isSelected ? "bg-white text-amber-700" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.no}
                    </span>
                    <span className="truncate text-xs font-heading">{s.sutra}</span>
                  </div>
                  <span className="text-[10px] opacity-80 flex-shrink-0">❯</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-8">
          <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Sutra Title & Meaning */}
            <div className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400 uppercase">
                  वैदिक सूत्र क्रमांक {currentSutra.no}
                </span>
                <span className="text-xs font-body text-muted-foreground">
                  16 सूत्रों का संकलन
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-1">
                {currentSutra.sutra}
              </h2>
              <p className="font-heading text-base text-amber-700 dark:text-amber-300 font-bold mt-1">
                अर्थ: "{currentSutra.meaning}"
              </p>
              <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                {currentSutra.intro}
              </p>
            </div>

            {/* Where to use */}
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <span>उपयोग के प्रमुख क्षेत्र (Where to Apply)</span>
              </h3>
              <div className="space-y-1.5">
                {currentSutra.uses.map((use, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-muted/50 text-xs font-body text-foreground flex items-center gap-2"
                  >
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Numerical Examples */}
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-2">
                📐 चरणबद्ध उदाहरण (Step-by-Step Examples)
              </h3>
              <div className="space-y-3">
                {currentSutra.steps.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-1"
                  >
                    <span className="font-heading text-xs font-bold text-amber-900 dark:text-amber-200 block">
                      {st.label}
                    </span>
                    <pre className="font-mono text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {st.text}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Mathematical Logic & Proof */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border">
              <h3 className="font-heading text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                💡 यह सूत्र क्यों काम करता है? (Algebraic Logic)
              </h3>
              <p className="font-body text-xs text-foreground/90 leading-relaxed">
                {currentSutra.why}
              </p>
            </div>

            {/* Interactive Mini Quiz for this Sutra */}
            {currentSutra.quiz && currentSutra.quiz.length > 0 && (
              <div className="pt-2">
                <h3 className="font-heading text-base font-bold text-foreground mb-3 flex items-center gap-2">
                  <span>🎯 सूत्र अभ्यास क्विज़ (+10 अंक)</span>
                </h3>
                <div className="space-y-3">
                  {currentSutra.quiz.map((q, qIdx) => {
                    const key = `${activeSutraNo}-${qIdx}`;
                    const answered = userAnswers[key];
                    const hasAnswered = answered !== undefined;
                    const isCorrect = answered === q.ans;

                    return (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-2xl border bg-background/60 space-y-2.5"
                      >
                        <p className="font-heading text-sm font-bold text-foreground">
                          {qIdx + 1}. {q.q}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {q.options.map((opt, optIdx) => {
                            let style = "bg-muted hover:bg-muted/80 text-foreground";
                            if (hasAnswered) {
                              if (optIdx === q.ans) {
                                style = "bg-green-500 text-white font-bold";
                              } else if (answered === optIdx) {
                                style = "bg-red-500 text-white";
                              } else {
                                style = "opacity-40 bg-muted";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleQuizAnswer(qIdx, optIdx, q.ans)}
                                disabled={hasAnswered}
                                className={`py-2 px-3 rounded-xl font-body text-xs transition font-bold ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {hasAnswered && (
                          <p
                            className={`text-[11px] font-heading font-bold ${
                              isCorrect ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isCorrect ? "✅ बहुत बढ़िया! सही उत्तर!" : `❌ गलत! सही उत्तर: ${q.options[q.ans]}`}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
