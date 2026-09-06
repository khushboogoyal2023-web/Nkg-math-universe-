import React, { useState } from "react";
import { Calculator, Volume2, Play, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export const TablesPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState(2);
  const [activeTab, setActiveTab] = useState<"view" | "quiz">("view");
  const [speaking, setSpeaking] = useState(false);
  const { addPoints } = useApp();

  // Quiz state
  const [quizMultipliers, setQuizMultipliers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Table recitation in Hindi
  const hindiWords = ["शून्य", "एकम", "दूनी", "तीए", "चौके", "पाँचे", "छक्के", "सत्ते", "अट्ठे", "नौवे", "धाए"];

  const speakTable = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const lines: string[] = [];
    for (let i = 1; i <= 10; i++) {
      lines.push(`${selectedTable} ${hindiWords[i] || i} ${selectedTable * i}`);
    }

    const textToSpeak = lines.join(", ");
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "hi-IN";
    utterance.rate = 0.85;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    quizMultipliers.forEach((m) => {
      if (parseInt(quizAnswers[m] || "0", 10) === selectedTable * m) {
        correctCount++;
      }
    });
    addPoints(correctCount * 5);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Calculator size={16} />
          <span>1 से 100 तक पहाड़े</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          जादुई पहाड़ा गुरु 🔢
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          पहाड़े पढ़ें, बोलकर सुनें (Voice Audio), और अपनी गति परखने के लिए लाइव टेस्ट दें!
        </p>
      </div>

      {/* Number Selectors: Quick 1-20 or Jump up to 100 */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
            पहाड़ा चुनें (1 से 100):
          </span>
          <span className="font-heading text-sm text-primary font-bold">
            चयनित: {selectedTable} का पहाड़ा
          </span>
        </div>

        {/* 1 to 20 Quick Buttons */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mb-3">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => {
                setSelectedTable(n);
                resetQuiz();
              }}
              className={`h-10 rounded-xl font-heading text-sm font-bold transition ${
                selectedTable === n
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Custom Input for up to 100 */}
        <div className="flex items-center gap-3 pt-3 border-t border-border/60">
          <span className="font-body text-xs text-muted-foreground">अन्य संख्या (1 - 100):</span>
          <input
            type="number"
            min={1}
            max={100}
            value={selectedTable}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= 100) {
                setSelectedTable(val);
                resetQuiz();
              }
            }}
            className="w-20 px-3 py-1.5 rounded-xl border-2 border-border bg-background font-heading text-center font-bold text-sm focus:border-orange-500 focus:outline-none"
          />
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {[25, 30, 36, 45, 50, 60, 75, 90, 99, 100].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedTable(num);
                  resetQuiz();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold border transition ${
                  selectedTable === num
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-background text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Tabs: Table Read vs Practice Quiz */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("view")}
          className={`px-6 py-2.5 rounded-full font-heading text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "view"
              ? "bg-orange-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          <Calculator size={16} />
          <span>पहाड़ा पढ़ें व सुनें</span>
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-6 py-2.5 rounded-full font-heading text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "quiz"
              ? "bg-orange-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          <Sparkles size={16} />
          <span>टेस्ट दें (Self Quiz)</span>
        </button>
      </div>

      {/* TAB 1: Table View & Audio */}
      {activeTab === "view" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm">
          {/* Table Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-border">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {selectedTable} का पहाड़ा (Table of {selectedTable})
              </h2>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                स्वर सुनकर दोहराएं और याद करें
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!speaking ? (
                <button
                  onClick={speakTable}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-heading text-xs sm:text-sm px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow transition"
                >
                  <Volume2 size={16} />
                  <span>बोलकर सुनाओ 🔊</span>
                </button>
              ) : (
                <button
                  onClick={stopSpeech}
                  className="bg-red-500 hover:bg-red-600 text-white font-heading text-xs sm:text-sm px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow transition animate-pulse"
                >
                  <RotateCcw size={16} />
                  <span>रोकें ⏹️</span>
                </button>
              )}
            </div>
          </div>

          {/* Table Grid (10 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((m) => {
              const result = selectedTable * m;
              return (
                <div
                  key={m}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/50 border border-border/70 hover:bg-orange-50/70 dark:hover:bg-orange-950/20 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-heading text-xs font-bold flex items-center justify-center">
                      {m}
                    </span>
                    <span className="font-mono text-base font-bold text-foreground">
                      {selectedTable} × {m}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-heading text-xl font-extrabold text-orange-600 dark:text-orange-400">
                      = {result}
                    </span>
                    <span className="block text-[11px] font-body text-muted-foreground">
                      {selectedTable} {hindiWords[m] || m} {result}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Table Self Quiz */}
      {activeTab === "quiz" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                {selectedTable} के पहाड़े का टेस्ट 🎯
              </h2>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                खाली डिब्बों में सही गुणनफल भरें और उत्तर जांचें
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="text-xs font-body font-bold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RotateCcw size={14} />
              <span>रीसेट करें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {quizMultipliers.map((m) => {
              const expected = selectedTable * m;
              const userVal = parseInt(quizAnswers[m] || "", 10);
              const isCorrect = userVal === expected;

              return (
                <div
                  key={m}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border ${
                    quizSubmitted
                      ? isCorrect
                        ? "bg-green-50 dark:bg-green-950/30 border-green-400 text-green-800 dark:text-green-200"
                        : "bg-red-50 dark:bg-red-950/30 border-red-400 text-red-800 dark:text-red-200"
                      : "bg-muted/40 border-border"
                  }`}
                >
                  <span className="font-mono text-base font-bold text-foreground">
                    {selectedTable} × {m} =
                  </span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={quizSubmitted}
                      value={quizAnswers[m] || ""}
                      onChange={(e) =>
                        setQuizAnswers((prev) => ({ ...prev, [m]: e.target.value }))
                      }
                      placeholder="?"
                      className="w-20 px-2 py-1 rounded-xl border bg-background text-center font-heading font-bold text-base focus:outline-none focus:border-orange-500"
                    />
                    {quizSubmitted && (
                      <span className="text-xs font-heading font-bold">
                        {isCorrect ? "✅" : `❌ (${expected})`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-heading text-base py-3 rounded-2xl font-bold shadow transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              <span>उत्तर जांचें (Check Results)</span>
            </button>
          ) : (
            <div className="p-4 bg-muted rounded-2xl text-center space-y-2">
              <p className="font-heading text-lg font-bold text-foreground">
                शानदार प्रयास! 🌟
              </p>
              <button
                onClick={resetQuiz}
                className="bg-primary text-primary-foreground font-heading text-sm px-6 py-2 rounded-xl font-bold shadow"
              >
                दोबारा टेस्ट दें
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
