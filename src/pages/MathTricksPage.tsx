import React, { useState } from "react";
import { Sparkles, Wand2, Calculator, Play, RotateCcw, ArrowRight } from "lucide-react";

export const MathTricksPage: React.FC = () => {
  // KAPREKAR 6174 STATE
  const [kaprekarInput, setKaprekarInput] = useState("3524");
  const [kaprekarSteps, setKaprekarSteps] = useState<string[]>([]);

  // 1089 MAGIC NUMBER STATE
  const [magic3Input, setMagic3Input] = useState("732");
  const [magic1089Steps, setMagic1089Steps] = useState<string[]>([]);

  // MULTIPLY BY 11 STATE
  const [elevenInput, setElevenInput] = useState("35");

  // PERCENTAGE SWAP TRICK STATE
  const [pctX, setPctX] = useState(8);
  const [pctY, setPctY] = useState(50);

  // Kaprekar 6174 Calculator
  const runKaprekar = () => {
    let numStr = kaprekarInput.padStart(4, "0");
    const steps: string[] = [];
    let current = parseInt(numStr, 10);

    for (let i = 1; i <= 7; i++) {
      const digits = current.toString().padStart(4, "0").split("");
      const desc = parseInt([...digits].sort((a, b) => b.localeCompare(a)).join(""), 10);
      const asc = parseInt([...digits].sort((a, b) => a.localeCompare(b)).join(""), 10);
      const diff = desc - asc;

      steps.push(`चरण ${i}: ${desc} - ${asc.toString().padStart(4, "0")} = ${diff}`);
      current = diff;
      if (current === 6174) {
        steps.push(`🎯 जादुई संख्या 6174 (कापरेकर स्थिरांक) प्राप्त हुआ!`);
        break;
      }
    }
    setKaprekarSteps(steps);
  };

  // 1089 Magic Number Calculator
  const run1089 = () => {
    const num = parseInt(magic3Input, 10);
    if (isNaN(num) || num < 100 || num > 999) return;
    const digits = magic3Input.split("").map(Number);
    if (digits[0] <= digits[2]) {
      alert("कृपया पहली संख्या अंतिम संख्या से बड़ी रखें (उदा. 732, 851, 942)!");
      return;
    }

    const rev = parseInt(magic3Input.split("").reverse().join(""), 10);
    const diff = num - rev;
    const diffStr = diff.toString().padStart(3, "0");
    const diffRev = parseInt(diffStr.split("").reverse().join(""), 10);
    const finalSum = diff + diffRev;

    const steps = [
      `1. आपकी संख्या: ${num}`,
      `2. अंक उलटें: ${rev}`,
      `3. घटाएँ: ${num} - ${rev} = ${diff}`,
      `4. अंतर को उलटें: ${diffRev}`,
      `5. दोनों को जोड़ें: ${diff} + ${diffRev} = ${finalSum}`,
      `✨ सदैव 1089 ही आएगा! यह गणित का अमर जादू है!`
    ];
    setMagic1089Steps(steps);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Wand2 size={16} />
          <span>दिमाग की बत्ती जलाने वाली गणितीय ट्रिक्स</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          जादुई गणित ट्रिक्स 🎩
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          कापरेकर स्थिरांक 6174, जादुई 1089, 11 से तीव्र गुणा और प्रतिशत अदला-बदली जैसी आश्चर्यजनक ट्रिक्स!
        </p>
      </div>

      <div className="space-y-8">
        {/* TRICK 1: KAPREKAR CONSTANT 6174 */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔮</span>
            <div>
              <span className="text-[11px] font-heading font-bold text-primary uppercase">
                ट्रिक 1: भारतीय गणितज्ञ डी. आर. कापरेकर की खोज
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                कापरेकर स्थिरांक 6174 (The Magic 6174)
              </h2>
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            कोई भी 4 अंकों की संख्या चुनें (जिसके चारों अंक समान न हों)। अंकों को घटते क्रम में और बढ़ते क्रम में लिखकर घटाएँ। अधिकतम 7 चरणों में आप सदैव <strong>6174</strong> पर ही पहुँचेंगे!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="text"
              maxLength={4}
              value={kaprekarInput}
              onChange={(e) => setKaprekarInput(e.target.value)}
              placeholder="उदा. 3524"
              className="w-32 px-3 py-2 rounded-xl border-2 border-border bg-background font-mono font-bold text-center text-base focus:outline-none focus:border-primary"
            />
            <button
              onClick={runKaprekar}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-xs sm:text-sm px-5 py-2.5 rounded-xl font-bold shadow flex items-center gap-1.5 transition"
            >
              <Play size={14} />
              <span>जादू देखें (Run 6174)</span>
            </button>
          </div>

          {kaprekarSteps.length > 0 && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl space-y-1.5 font-mono text-xs text-purple-950 dark:text-purple-200">
              {kaprekarSteps.map((step, idx) => (
                <div key={idx}>{step}</div>
              ))}
            </div>
          )}
        </div>

        {/* TRICK 2: MAGIC 1089 */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <span className="text-[11px] font-heading font-bold text-primary uppercase">
                ट्रिक 2: माइंड रीडिंग गणित
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                जादुई संख्या 1089 (Magic 1089 Trick)
              </h2>
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            3 अंकों की कोई संख्या सोचें जिसका पहला अंक अंतिम अंक से बड़ा हो (उदा. 732)। संख्या को उलटकर घटाएं, फिर परिणाम को उलटकर जोड़ें। उत्तर हमेशा <strong>1089</strong> ही आएगा!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="text"
              maxLength={3}
              value={magic3Input}
              onChange={(e) => setMagic3Input(e.target.value)}
              placeholder="उदा. 732"
              className="w-32 px-3 py-2 rounded-xl border-2 border-border bg-background font-mono font-bold text-center text-base focus:outline-none focus:border-primary"
            />
            <button
              onClick={run1089}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-xs sm:text-sm px-5 py-2.5 rounded-xl font-bold shadow flex items-center gap-1.5 transition"
            >
              <Sparkles size={14} />
              <span>1089 साबित करें</span>
            </button>
          </div>

          {magic1089Steps.length > 0 && (
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl space-y-1.5 font-mono text-xs text-teal-950 dark:text-teal-200">
              {magic1089Steps.map((step, idx) => (
                <div key={idx}>{step}</div>
              ))}
            </div>
          )}
        </div>

        {/* TRICK 3: MULTIPLY BY 11 */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <span className="text-[11px] font-heading font-bold text-primary uppercase">
                ट्रिक 3: सुपरफास्ट गणना
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                11 से 1 सेकंड में गुणा (Lightning 11 Multiplier)
              </h2>
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            2 अंकों की संख्या को 11 से गुणा करने के लिए दोनों अंकों को फैलाकर उनके बीच में उनका योग रख दें!
          </p>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={10}
              max={99}
              value={elevenInput}
              onChange={(e) => setElevenInput(e.target.value)}
              className="w-24 px-3 py-2 rounded-xl border-2 border-border bg-background font-mono font-bold text-center text-base focus:outline-none focus:border-primary"
            />
            <span className="font-heading text-lg font-bold">× 11 =</span>
            {(() => {
              const val = parseInt(elevenInput, 10) || 0;
              const d1 = Math.floor(val / 10);
              const d2 = val % 10;
              const sum = d1 + d2;
              const res = val * 11;
              return (
                <div className="flex items-center gap-2 font-mono font-extrabold text-xl text-primary">
                  <span>{res}</span>
                  <span className="text-xs text-muted-foreground font-body">
                    ({d1} और {d2} के बीच {sum} रखा)
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* TRICK 4: PERCENTAGE SWAP */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔄</span>
            <div>
              <span className="text-[11px] font-heading font-bold text-primary uppercase">
                ट्रिक 4: प्रतिशत अदला-बदली
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                x% of y = y% of x
              </h2>
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            50 का 8% निकालना कठिन लग सकता है, लेकिन 8 का 50% (यानी 8 का आधा = 4) चुटकियों में हल हो जाता है!
          </p>

          <div className="p-4 bg-muted/40 rounded-2xl border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-heading text-sm">
              <input
                type="number"
                value={pctX}
                onChange={(e) => setPctX(parseInt(e.target.value, 10) || 0)}
                className="w-16 px-2 py-1 border rounded-lg bg-background text-center"
              />
              <span>% of</span>
              <input
                type="number"
                value={pctY}
                onChange={(e) => setPctY(parseInt(e.target.value, 10) || 0)}
                className="w-16 px-2 py-1 border rounded-lg bg-background text-center"
              />
              <span>=</span>
              <span className="font-mono text-xl font-bold text-primary">
                {(pctX * pctY) / 100}
              </span>
            </div>

            <div className="text-xs font-body text-muted-foreground">
              वही परिणाम: <strong>{pctY}% of {pctX} = {(pctX * pctY) / 100}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
