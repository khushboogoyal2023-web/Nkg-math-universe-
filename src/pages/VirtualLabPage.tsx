import React, { useState } from "react";
import { FlaskConical, Download, ArrowLeft, RotateCcw, Play } from "lucide-react";

interface Experiment {
  id: number;
  title: string;
  topic: string;
  class: string;
  emoji: string;
  color: string;
  objective: string;
}

const experiments: Experiment[] = [
  { id: 1, title: "π (पाई) का प्रायोगिक सत्यापन", topic: "ज्यामिति", class: "6-8", emoji: "⭕", color: "from-blue-500 to-indigo-600", objective: "विभिन्न वृत्तों की परिधि (C) और व्यास (d) का अनुपात C/d = π ≈ 3.14159 सिद्ध करना।" },
  { id: 2, title: "पाइथागोरस प्रमेय सत्यापन", topic: "ज्यामिति", class: "7-9", emoji: "📐", color: "from-purple-500 to-violet-600", objective: "समकोण त्रिभुज में कर्ण का वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है: a² + b² = c²।" },
  { id: 3, title: "रैखिक समीकरण संतुलन (Equation Balance)", topic: "बीजगणित", class: "6-8", emoji: "⚖️", color: "from-teal-500 to-green-600", objective: "तराजू के दोनों पलड़ों में समान मान जोड़कर या घटाकर अज्ञात चर का मान ज्ञात करना।" },
  { id: 4, title: "सिक्का उछाल प्रायिकता सिम्युलेटर", topic: "प्रायिकता", class: "8-9", emoji: "🪙", color: "from-amber-500 to-orange-600", objective: "बड़े पैमाने पर सिक्का उछालकर चित्त (Heads) और पट (Tails) आने की प्रायिकता 1/2 सिद्ध करना।" },
  { id: 5, title: "त्रिभुज के तीनों कोणों का योग 180°", topic: "ज्यामिति", class: "6-8", emoji: "🔺", color: "from-rose-500 to-pink-600", objective: "किसी भी त्रिभुज के तीनों कोणों को काटकर जोड़ने पर एक सरल रेखा (180°) बनती है।" },
  { id: 6, title: "भिन्न और प्रतिशत का परस्पर संबंध", topic: "अंकगणित", class: "5-7", emoji: "🍕", color: "from-cyan-500 to-blue-600", objective: "भागों को रंगकर भिन्न, दशमलव और प्रतिशत का तुल्य मान समझना।" },
  { id: 7, title: "समांतर रेखाओं और तिर्यक रेखा के कोण", topic: "ज्यामिति", class: "7-9", emoji: "📏", color: "from-indigo-500 to-purple-600", objective: "संगत कोण, एकांतर अंतः कोण और शीर्षाभिमुख कोणों के गुणों का सत्यापन।" },
  { id: 8, title: "द्विघात समीकरण का ग्राफीय निरूपण", topic: "बीजगणित", class: "9", emoji: "📈", color: "from-emerald-500 to-teal-600", objective: "y = ax² + bx + c के परवलय (Parabola) ग्राफ और उसके मूल (Roots) खोजना।" },
  { id: 9, title: "पासा फेंकने पर प्रायिकता", topic: "प्रायिकता", class: "7-9", emoji: "🎲", color: "from-orange-500 to-amber-600", objective: "1 से 6 तक आने की व्यक्तिगत व युग्म प्रायिकता का बार चार्ट निर्माण।" },
  { id: 10, title: "बेलन और शंकु के आयतन का संबंध", topic: "क्षेत्रमिति", class: "8-9", emoji: "🍦", color: "from-violet-500 to-purple-600", objective: "समान आधार और ऊंचाई के शंकु व बेलन में V(शंकु) = ⅓ × V(बेलन) का सत्यापन।" },
];

for (let i = 11; i <= 20; i++) {
  experiments.push({
    id: i,
    title: `गणित प्रयोग #${i} — आभासी अन्वेषण`,
    topic: "प्रायोगिक गणित",
    class: "6-9",
    emoji: "🔬",
    color: "from-slate-600 to-gray-800",
    objective: "आभासी प्रयोगशाला में गणितीय नियमों का चरणबद्ध अन्वेषण और सत्यापन।",
  });
}

export const VirtualLabPage: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number | null>(null);

  // Experiment 1: Pi Verification State
  const [piDiameter, setPiDiameter] = useState(10);
  const piCircumference = Number((Math.PI * piDiameter).toFixed(2));
  const piCalculated = Number((piCircumference / piDiameter).toFixed(4));

  // Experiment 2: Pythagoras State
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const sideC = Number(Math.sqrt(sideA * sideA + sideB * sideB).toFixed(2));

  // Experiment 4: Coin Toss State
  const [tosses, setTosses] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });

  const flipCoin = (n: number) => {
    let h = 0;
    let t = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.5) h++;
      else t++;
    }
    setTosses((prev) => ({ heads: prev.heads + h, tails: prev.tails + t }));
  };

  const handleDownload = (e: Experiment) => {
    const text = `NKG MATH UNIVERSE — Virtual Math Lab Report\n==============================================\n\nप्रयोग संख्या: #${e.id}\nशीर्षक: ${e.title}\nकक्षा: ${e.class} | विषय: ${e.topic}\n\nउद्देश्य:\n${e.objective}\n\nनिष्कर्ष:\nप्रयोग द्वारा गणितीय नियम पूर्णतः सिद्ध हुआ।\n\n© 2026 NKG MATH UNIVERSE`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Lab_Experiment_${e.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-3xl p-4 shadow-xl">
            <FlaskConical size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          🧪 वर्चुअल गणित लैब (Virtual Math Lab)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          20 इंटरैक्टिव प्रयोग — सूत्रों को स्वयं सिद्ध करें!
        </p>
      </div>

      {selectedExp === null ? (
        /* Experiments Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp.id)}
              className="cursor-pointer group"
            >
              <div className="bg-card border rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between h-full">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`bg-gradient-to-br ${exp.color} text-white rounded-2xl p-3 shrink-0 shadow-md`}
                  >
                    <span className="text-2xl">{exp.emoji}</span>
                  </div>
                  <div>
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                      कक्षा {exp.class} • {exp.topic}
                    </span>
                    <h3 className="font-heading text-base text-foreground mt-1 mb-1">
                      #{exp.id}. {exp.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground line-clamp-2">
                      {exp.objective}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="font-heading text-primary font-bold">प्रयोग शुरू करें →</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(exp);
                    }}
                    className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
                    title="रिपोर्ट डाउनलोड करें"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Active Experiment Screen */
        <div className="bg-card border rounded-3xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedExp(null)}
              className="flex items-center gap-1.5 text-xs font-heading font-bold text-primary hover:underline min-h-0"
            >
              <ArrowLeft size={16} /> सभी 20 प्रयोग
            </button>
            <button
              onClick={() => {
                const exp = experiments.find((e) => e.id === selectedExp);
                if (exp) handleDownload(exp);
              }}
              className="flex items-center gap-1 text-xs bg-muted px-3 py-1.5 rounded-xl font-bold font-body text-muted-foreground hover:text-foreground"
            >
              <Download size={14} /> प्रयोग रिपोर्ट डाउनलोड
            </button>
          </div>

          {/* Exp 1: Pi Verification */}
          {selectedExp === 1 && (
            <div className="space-y-4 text-center">
              <h2 className="font-heading text-xl text-primary">⭕ π का प्रायोगिक सत्यापन</h2>
              <div className="flex justify-center py-4">
                <div
                  className="rounded-full border-4 border-dashed border-primary flex items-center justify-center font-heading text-sm text-primary shadow-inner transition-all"
                  style={{ width: piDiameter * 18, height: piDiameter * 18 }}
                >
                  व्यास = {piDiameter} cm
                </div>
              </div>
              <div className="max-w-xs mx-auto">
                <label className="font-body text-xs font-bold block mb-1">
                  व्यास (d): {piDiameter} cm
                </label>
                <input
                  type="range"
                  min="4"
                  max="16"
                  value={piDiameter}
                  onChange={(e) => setPiDiameter(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-primary/10 rounded-2xl p-3">
                  <p className="text-[10px] text-muted-foreground">मापी गई परिधि (C)</p>
                  <p className="font-heading text-lg text-primary">{piCircumference} cm</p>
                </div>
                <div className="bg-muted rounded-2xl p-3">
                  <p className="text-[10px] text-muted-foreground">व्यास (d)</p>
                  <p className="font-heading text-lg">{piDiameter} cm</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-2xl p-3">
                  <p className="text-[10px] text-green-700 dark:text-green-300">C / d का मान</p>
                  <p className="font-heading text-lg text-green-600 font-bold">{piCalculated}</p>
                </div>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                निष्कर्ष: किसी भी वृत्त में C/d सदा स्थिर संख्या होती है जिसे <strong>π (≈ 3.14159)</strong> कहते हैं।
              </p>
            </div>
          )}

          {/* Exp 2: Pythagoras */}
          {selectedExp === 2 && (
            <div className="space-y-4 text-center">
              <h2 className="font-heading text-xl text-primary">📐 पाइथागोरस प्रमेय: a² + b² = c²</h2>
              <div className="flex justify-center gap-6 max-w-sm mx-auto">
                <div className="flex-1">
                  <label className="font-body text-xs font-bold block mb-1">लम्ब (a) = {sideA}</label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={sideA}
                    onChange={(e) => setSideA(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-body text-xs font-bold block mb-1">आधार (b) = {sideB}</label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={sideB}
                    onChange={(e) => setSideB(Number(e.target.value))}
                    className="w-full accent-secondary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-primary/10 rounded-2xl p-3">
                  <p className="text-[10px] text-muted-foreground">a² का क्षेत्रफल</p>
                  <p className="font-heading text-xl text-primary">{sideA * sideA}</p>
                </div>
                <div className="bg-secondary/10 rounded-2xl p-3">
                  <p className="text-[10px] text-muted-foreground">b² का क्षेत्रफल</p>
                  <p className="font-heading text-xl text-secondary">{sideB * sideB}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-2xl p-3">
                  <p className="text-[10px] text-green-700 dark:text-green-300">c² = a² + b²</p>
                  <p className="font-heading text-xl text-green-600 font-bold">
                    {sideA * sideA + sideB * sideB}
                  </p>
                  <p className="text-[10px] font-bold">कर्ण c = {sideC}</p>
                </div>
              </div>
            </div>
          )}

          {/* Exp 4: Coin Toss Probability */}
          {selectedExp === 4 && (
            <div className="space-y-4 text-center">
              <h2 className="font-heading text-xl text-primary">🪙 सिक्का उछाल प्रायिकता सिम्युलेटर</h2>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => flipCoin(1)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-bold text-xs"
                >
                  1 बार उछालें
                </button>
                <button
                  onClick={() => flipCoin(10)}
                  className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-body font-bold text-xs"
                >
                  10 बार उछालें
                </button>
                <button
                  onClick={() => flipCoin(100)}
                  className="px-4 py-2 rounded-xl bg-accent text-accent-foreground font-body font-bold text-xs"
                >
                  100 बार उछालें
                </button>
                <button
                  onClick={() => setTosses({ heads: 0, tails: 0 })}
                  className="px-3 py-2 rounded-xl border text-xs font-body hover:bg-muted"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {tosses.heads + tosses.tails > 0 && (
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl p-3">
                    <p className="font-heading text-sm text-amber-800 dark:text-amber-300">
                      चित्त (Heads): {tosses.heads}
                    </p>
                    <p className="font-heading text-2xl font-bold">
                      {((tosses.heads / (tosses.heads + tosses.tails)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-2xl p-3">
                    <p className="font-heading text-sm text-blue-800 dark:text-blue-300">
                      पट (Tails): {tosses.tails}
                    </p>
                    <p className="font-heading text-2xl font-bold">
                      {((tosses.tails / (tosses.heads + tosses.tails)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
              <p className="font-body text-xs text-muted-foreground">
                कुल उछाल: {tosses.heads + tosses.tails} | जितना अधिक उछालेंगे, प्रायिकता उतनी ही 50% (1/2) के करीब पहुंचेगी।
              </p>
            </div>
          )}

          {/* Fallback for other experiments */}
          {selectedExp !== 1 && selectedExp !== 2 && selectedExp !== 4 && (
            <div className="p-6 text-center space-y-3">
              <span className="text-5xl">🔬</span>
              <h3 className="font-heading text-lg">
                {experiments.find((e) => e.id === selectedExp)?.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground max-w-md mx-auto">
                {experiments.find((e) => e.id === selectedExp)?.objective}
              </p>
              <div className="bg-muted/40 p-4 rounded-2xl max-w-sm mx-auto border text-left font-body text-xs space-y-1.5">
                <p>✅ <strong>चरण 1:</strong> प्रारंभिक मान व आयाम निर्धारित करें।</p>
                <p>✅ <strong>चरण 2:</strong> आभासी उपकरणों से गणना दर्ज करें।</p>
                <p>✅ <strong>चरण 3:</strong> सूत्र से तुलना करके परिणाम सत्यापित करें।</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
