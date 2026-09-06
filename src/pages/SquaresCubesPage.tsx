import React, { useState } from "react";
import { Award, Search, Sparkles, CheckCircle2, RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";

export const SquaresCubesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"squares" | "cubes" | "calculator" | "practice">("squares");
  const [searchTerm, setSearchTerm] = useState("");
  const [rangeFilter, setRangeFilter] = useState<"all" | "1-25" | "26-50" | "51-75" | "76-100">("all");
  const { addPoints } = useApp();

  // Root Calculator state
  const [calcInput, setCalcInput] = useState<number>(25);

  // Practice state
  const [practiceType, setPracticeType] = useState<"square" | "cube">("square");
  const [currentNum, setCurrentNum] = useState(7);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const generateNewPractice = () => {
    const max = practiceType === "square" ? 30 : 15;
    const next = Math.floor(Math.random() * max) + 1;
    setCurrentNum(next);
    setPracticeAnswer("");
    setFeedback(null);
  };

  const handleCheckPractice = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = practiceType === "square" ? currentNum * currentNum : currentNum * currentNum * currentNum;
    const userVal = parseInt(practiceAnswer.trim(), 10);
    if (userVal === expected) {
      setFeedback("🎉 एकदम सही उत्तर! शाबाश! +10 अंक");
      addPoints(10);
    } else {
      setFeedback(`❌ गलत उत्तर! सही उत्तर ${expected} है।`);
    }
  };

  // Generate Squares 1 to 100
  const squaresList = Array.from({ length: 100 }, (_, i) => {
    const n = i + 1;
    return { n, val: n * n };
  }).filter((item) => {
    if (searchTerm) {
      return item.n.toString().includes(searchTerm) || item.val.toString().includes(searchTerm);
    }
    if (rangeFilter === "1-25") return item.n >= 1 && item.n <= 25;
    if (rangeFilter === "26-50") return item.n >= 26 && item.n <= 50;
    if (rangeFilter === "51-75") return item.n >= 51 && item.n <= 75;
    if (rangeFilter === "76-100") return item.n >= 76 && item.n <= 100;
    return true;
  });

  // Generate Cubes 1 to 50
  const cubesList = Array.from({ length: 50 }, (_, i) => {
    const n = i + 1;
    return { n, val: n * n * n };
  }).filter((item) => {
    if (searchTerm) {
      return item.n.toString().includes(searchTerm) || item.val.toString().includes(searchTerm);
    }
    if (rangeFilter === "1-25") return item.n >= 1 && item.n <= 25;
    if (rangeFilter === "26-50") return item.n >= 26 && item.n <= 50;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Award size={16} />
          <span>वर्ग (1-100) व घन (1-50)</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          वर्ग और घन सागर ⭐
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          वर्ग (n²), घन (n³), वर्गमूल (√), और घनमूल (∛) की विस्तृत सारणी व त्वरित अभ्यास।
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("squares")}
          className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-bold transition ${
            activeTab === "squares"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          वर्ग (Squares 1-100)
        </button>
        <button
          onClick={() => setActiveTab("cubes")}
          className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-bold transition ${
            activeTab === "cubes"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          घन (Cubes 1-50)
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-bold transition ${
            activeTab === "calculator"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          रूट कैलकुलेटर (√ व ∛)
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
            activeTab === "practice"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-card text-muted-foreground hover:bg-muted border"
          }`}
        >
          <Sparkles size={14} />
          <span>स्पीड टेस्ट</span>
        </button>
      </div>

      {/* TAB 1: SQUARES */}
      {activeTab === "squares" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="संख्या या वर्ग खोजें (उदा. 25 या 625)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border bg-background text-sm font-body focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto">
              {(["all", "1-25", "26-50", "51-75", "76-100"] as const).map((rng) => (
                <button
                  key={rng}
                  onClick={() => setRangeFilter(rng)}
                  className={`px-3 py-1 rounded-lg text-xs font-heading font-bold transition border ${
                    rangeFilter === rng
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {rng === "all" ? "सभी (1-100)" : rng}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {squaresList.map(({ n, val }) => (
              <div
                key={n}
                className="p-3.5 rounded-2xl bg-muted/40 border border-border/70 hover:border-pink-300 hover:bg-pink-50/40 dark:hover:bg-pink-950/20 transition text-center group"
              >
                <span className="font-heading text-xs font-bold text-muted-foreground block">
                  {n}² ({n} × {n})
                </span>
                <span className="font-mono text-xl font-extrabold text-pink-600 dark:text-pink-400 mt-0.5 block group-hover:scale-105 transition-transform">
                  {val}
                </span>
                <span className="text-[10px] font-body text-muted-foreground">
                  √{val} = {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CUBES */}
      {activeTab === "cubes" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="संख्या या घन खोजें (उदा. 12 या 1728)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border bg-background text-sm font-body focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex gap-1.5">
              {(["all", "1-25", "26-50"] as const).map((rng) => (
                <button
                  key={rng}
                  onClick={() => setRangeFilter(rng)}
                  className={`px-3 py-1 rounded-lg text-xs font-heading font-bold transition border ${
                    rangeFilter === rng
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-background text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {rng === "all" ? "सभी (1-50)" : rng}
                </button>
              ))}
            </div>
          </div>

          {/* Cubes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cubesList.map(({ n, val }) => (
              <div
                key={n}
                className="p-3.5 rounded-2xl bg-muted/40 border border-border/70 hover:border-purple-300 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition text-center group"
              >
                <span className="font-heading text-xs font-bold text-muted-foreground block">
                  {n}³ ({n}×{n}×{n})
                </span>
                <span className="font-mono text-lg font-extrabold text-purple-600 dark:text-purple-400 mt-0.5 block group-hover:scale-105 transition-transform">
                  {val.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-body text-muted-foreground">
                  ∛{val} = {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ROOT CALCULATOR */}
      {activeTab === "calculator" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            जीवंत रूट कैलकुलेटर
          </h2>
          <p className="font-body text-xs text-muted-foreground mb-6">
            कोई भी संख्या दर्ज करें और तुरंत उसका वर्ग, घन, वर्गमूल और घनमूल जानें।
          </p>

          <div className="mb-6">
            <input
              type="number"
              value={calcInput}
              onChange={(e) => setCalcInput(parseFloat(e.target.value) || 0)}
              className="text-center font-heading text-3xl font-extrabold px-4 py-3 rounded-2xl border-2 border-pink-400 bg-background w-48 focus:outline-none focus:ring-4 focus:ring-pink-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
              <span className="text-xs font-heading text-pink-700 dark:text-pink-300 font-bold block">
                वर्ग (Square - n²)
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-pink-900 dark:text-pink-100 mt-1 block">
                {(calcInput * calcInput).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs font-heading text-purple-700 dark:text-purple-300 font-bold block">
                घन (Cube - n³)
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-purple-900 dark:text-purple-100 mt-1 block">
                {(calcInput * calcInput * calcInput).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-xs font-heading text-teal-700 dark:text-teal-300 font-bold block">
                वर्गमूल (Square Root - √n)
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-teal-900 dark:text-teal-100 mt-1 block">
                {calcInput >= 0 ? Math.sqrt(calcInput).toFixed(3) : "काल्पनिक"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-xs font-heading text-amber-700 dark:text-amber-300 font-bold block">
                घनमूल (Cube Root - ∛n)
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-amber-900 dark:text-amber-100 mt-1 block">
                {Math.cbrt(calcInput).toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPEED TEST */}
      {activeTab === "practice" && (
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => {
                setPracticeType("square");
                generateNewPractice();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold border transition ${
                practiceType === "square"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              वर्ग टेस्ट (n²)
            </button>
            <button
              onClick={() => {
                setPracticeType("cube");
                generateNewPractice();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold border transition ${
                practiceType === "cube"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              घन टेस्ट (n³)
            </button>
          </div>

          <div className="p-6 bg-muted/40 rounded-2xl border mb-6">
            <span className="text-xs font-heading text-muted-foreground uppercase tracking-wider block mb-1">
              सवाल बताएं:
            </span>
            <span className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground">
              {currentNum}
              {practiceType === "square" ? "²" : "³"} = ?
            </span>
            <span className="block text-xs font-body text-muted-foreground mt-2">
              ({currentNum} को {practiceType === "square" ? "दो" : "तीन"} बार गुणा करें)
            </span>
          </div>

          <form onSubmit={handleCheckPractice} className="space-y-4">
            <input
              type="number"
              value={practiceAnswer}
              onChange={(e) => setPracticeAnswer(e.target.value)}
              placeholder="यहाँ उत्तर लिखें..."
              autoFocus
              className="text-center font-heading text-2xl font-bold px-4 py-3 rounded-2xl border-2 border-border bg-background w-56 focus:outline-none focus:border-pink-500"
            />

            <div className="flex justify-center gap-2">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-heading text-sm px-6 py-2.5 rounded-xl font-bold shadow transition flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} />
                <span>जांचें</span>
              </button>
              <button
                type="button"
                onClick={generateNewPractice}
                className="bg-muted hover:bg-muted/80 text-foreground font-heading text-sm px-4 py-2.5 rounded-xl font-bold border transition flex items-center gap-1.5"
              >
                <RotateCcw size={16} />
                <span>अगला सवाल</span>
              </button>
            </div>
          </form>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-background border font-heading text-sm font-bold text-foreground">
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
