import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Timer,
  CheckCircle2,
  XCircle,
  Play
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { saveLeaderboardEntry } from "../components/LeaderboardModal";

interface GameInfo {
  id: string;
  title: string;
  emoji: string;
  category: string;
  grade: string;
  desc: string;
  color: string;
}

const gamesList: GameInfo[] = [
  { id: "speed-math", title: "स्पीड मैथ (Speed Math)", emoji: "⚡", category: "अंकगणित", grade: "1-9", desc: "30 सेकंड में जितने हो सकें सही जोड़-घटाव हल करें!", color: "from-amber-400 to-orange-500" },
  { id: "prime-hunter", title: "अभाज्य शिकारी (Prime Hunter)", emoji: "🎯", category: "संख्याएं", grade: "4-9", desc: "स्क्रीन पर तैरती संख्याओं में से केवल अभाज्य संख्याएं चुनें!", color: "from-red-500 to-rose-600" },
  { id: "guess-number", title: "संख्या खोजो (Guess My Number)", emoji: "🕵️", category: "तर्क", grade: "1-8", desc: "1 से 100 के बीच गुप्त संख्या खोजें — कम या ज्यादा संकेतों से!", color: "from-purple-500 to-indigo-600" },
  { id: "true-false", title: "सत्य या असत्य बिजली (True/False)", emoji: "⚡", category: "फास्ट मैथ", grade: "2-9", desc: "क्या 7 × 8 = 56? तेज़ गति से सही या गलत का निर्णय लें!", color: "from-teal-500 to-green-600" },
  { id: "fraction-pizza", title: "पिज़्ज़ा भिन्न (Fraction Pizza)", emoji: "🍕", category: "भिन्न", grade: "3-7", desc: "दिए गए भिन्न (उदा. 3/8) के अनुसार सही पिज़्ज़ा स्लाइस चुनें!", color: "from-orange-500 to-red-500" },
  { id: "equation-balance", title: "तराजू बैलेंस (Balance Scale)", emoji: "⚖️", category: "बीजगणित", grade: "4-9", desc: "दोनों पलड़ों को समान करने के लिए अज्ञात x का मान ज्ञात करें!", color: "from-blue-500 to-cyan-600" },
  { id: "number-pattern", title: "पैटर्न जासूस (Pattern Detective)", emoji: "🔍", category: "तर्क", grade: "2-8", desc: "2, 4, 8, 16, ? — अगली संख्या क्या होगी?", color: "from-pink-500 to-rose-600" },
  { id: "shark-compare", title: "मगरमच्छ की भूख (Greater/Smaller)", emoji: "🐊", category: "तुलना", grade: "1-5", desc: "बड़ी संख्या की तरफ मुंह खोलें: > , < या = ?", color: "from-green-500 to-emerald-600" },
  { id: "table-blast", title: "पहाड़ा ब्लास्ट (Table Blast)", emoji: "💥", category: "पहाड़े", grade: "2-6", desc: "सही गुणनफल पर समय रहते क्लिक करें!", color: "from-violet-500 to-purple-600" },
  { id: "clock-master", title: "घड़ी मास्टर (Clock Master)", emoji: "⏰", category: "समय", grade: "2-6", desc: "घड़ी की सुइयां देखकर सही समय बताएं!", color: "from-cyan-500 to-blue-600" },
  { id: "factor-pop", title: "गुणनखंड फोड़ो (Factor Pop)", emoji: "🎈", category: "गुणनखंड", grade: "4-8", desc: "दी गई संख्या (उदा. 24) के गुणनखंड गुब्बारों को फोड़ें!", color: "from-yellow-400 to-amber-500" },
  { id: "bazaar-change", title: "बाज़ार और मुद्रा (Currency Bazaar)", emoji: "💰", category: "दैनिक गणित", grade: "2-7", desc: "दुकानदार को सटीक रुपये-पैसे लौटाएं!", color: "from-emerald-500 to-teal-600" },
  { id: "angle-shooter", title: "कोण धनुर्धर (Angle Guesser)", emoji: "📐", category: "ज्यामिति", grade: "4-9", desc: "आकृति देखकर अनुमान लगाएं: 45°, 90°, 120° या 180°?", color: "from-rose-500 to-pink-600" },
  { id: "make-24", title: "24 बनाओ (Make 24 Puzzle)", emoji: "🎲", category: "तर्क", grade: "5-9", desc: "4 संख्याओं से +, -, ×, ÷ का उपयोग कर 24 बनाएं!", color: "from-indigo-500 to-purple-600" },
  { id: "roman-quest", title: "रोमन अंक खोज (Roman Quest)", emoji: "🏛️", category: "रोमन अंक", grade: "3-8", desc: "XIV, XL, LX, C को सामान्य संख्याओं में बदलें!", color: "from-amber-600 to-orange-700" },
  { id: "memory-math", title: "स्मृति गणित (Math Memory)", emoji: "🧠", category: "मेमोरी", grade: "1-8", desc: "समान मान वाले कार्ड्स के जोड़े मिलाएं (उदा. 4×4 और 16)!", color: "from-teal-600 to-green-700" },
  { id: "sudoku-mini", title: "मिनी सुडोकू (4×4 Sudoku)", emoji: "🧩", category: "तर्क", grade: "3-9", desc: "प्रत्येक पंक्ति व डिब्बे में 1, 2, 3, 4 भरें!", color: "from-blue-600 to-indigo-700" },
  { id: "square-run", title: "वर्ग धावक (Square Sprint)", emoji: "🏃", category: "वर्ग", grade: "4-9", desc: "संख्या का वर्ग तेजी से पहचानें!", color: "from-pink-600 to-red-600" },
  { id: "lcm-hcf-duel", title: "ल.स. और म.स. द्वंद्व (LCM / HCF)", emoji: "⚔️", category: "अंकगणित", grade: "5-9", desc: "दो संख्याओं का LCM और HCF चुटकियों में बताएं!", color: "from-purple-600 to-pink-600" },
  { id: "math-riddle", title: "गणितीय पहेलियाँ (Math Riddles)", emoji: "💡", category: "पहेलियाँ", grade: "1-9", desc: "रोचक और दिमाग की बत्ती जलाने वाली पहेलियाँ हल करें!", color: "from-yellow-500 to-orange-600" },
];

export const GamesPage: React.FC = () => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const { addPoints } = useApp();

  // SPEED MATH STATE
  const [speedQuestion, setSpeedQuestion] = useState({ text: "5 + 7", ans: 12, options: [10, 11, 12, 13] });
  const [speedScore, setSpeedScore] = useState(0);
  const [speedTime, setSpeedTime] = useState(30);
  const [speedActive, setSpeedActive] = useState(false);

  // GUESS MY NUMBER STATE
  const [targetNumber, setTargetNumber] = useState(42);
  const [guessInput, setGuessInput] = useState("");
  const [guessHint, setGuessHint] = useState<string | null>(null);
  const [guessAttempts, setGuessAttempts] = useState(0);

  // TRUE/FALSE STATE
  const [tfStatement, setTfStatement] = useState({ text: "8 × 7 = 56", isTrue: true });
  const [tfScore, setTfScore] = useState(0);

  // PRIME HUNTER STATE
  const [primeGrid, setPrimeGrid] = useState<number[]>([]);
  const [primeScore, setPrimeScore] = useState(0);

  // FRACTION PIZZA STATE
  const [pizzaTarget, setPizzaTarget] = useState({ num: 3, den: 8 });
  const [pizzaOptions, setPizzaOptions] = useState<number[]>([2, 3, 5, 7]);
  const [pizzaScore, setPizzaScore] = useState(0);

  // Start Speed Math
  const startSpeedMath = () => {
    setSpeedScore(0);
    setSpeedTime(30);
    setSpeedActive(true);
    generateSpeedQuestion();
  };

  const generateSpeedQuestion = () => {
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 12) + 1;
    let b = Math.floor(Math.random() * 12) + 1;
    if (op === "-" && a < b) [a, b] = [b, a];

    let ans = op === "+" ? a + b : op === "-" ? a - b : a * b;
    const wrong = [ans + 1, ans - 1, ans + 2].sort(() => Math.random() - 0.5);
    const options = [ans, ...wrong.slice(0, 3)].sort(() => Math.random() - 0.5);

    setSpeedQuestion({ text: `${a} ${op} ${b}`, ans, options });
  };

  useEffect(() => {
    let interval: any;
    if (speedActive && speedTime > 0) {
      interval = setInterval(() => setSpeedTime((t) => t - 1), 1000);
    } else if (speedTime === 0 && speedActive) {
      setSpeedActive(false);
      addPoints(speedScore * 10);
      saveLeaderboardEntry("मेधावी छात्र", speedScore, 30, "intermediate", "स्पीड मैथ");
    }
    return () => clearInterval(interval);
  }, [speedActive, speedTime, speedScore]);

  const handleSpeedAnswer = (opt: number) => {
    if (!speedActive) return;
    if (opt === speedQuestion.ans) {
      setSpeedScore((s) => s + 1);
    }
    generateSpeedQuestion();
  };

  // Guess Number setup
  const initGuessNumber = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuessInput("");
    setGuessHint("मैंने 1 से 100 के बीच एक संख्या सोची है। अनुमान लगाएं!");
    setGuessAttempts(0);
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(guessInput.trim(), 10);
    if (isNaN(val)) return;
    const newAttempts = guessAttempts + 1;
    setGuessAttempts(newAttempts);

    if (val === targetNumber) {
      setGuessHint(`🎉 बधाई! आपने ${newAttempts} प्रयासों में सही संख्या ${targetNumber} खोज ली! +25 अंक!`);
      addPoints(25);
    } else if (val < targetNumber) {
      setGuessHint(`📉 ${val} बहुत छोटा है! और बड़ी संख्या सोचें ⬆️`);
    } else {
      setGuessHint(`📈 ${val} बहुत बड़ा है! और छोटी संख्या सोचें ⬇️`);
    }
    setGuessInput("");
  };

  // Prime Hunter setup
  const isPrime = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const initPrimeHunter = () => {
    const nums: number[] = [];
    for (let i = 0; i < 16; i++) {
      nums.push(Math.floor(Math.random() * 50) + 2);
    }
    setPrimeGrid(nums);
    setPrimeScore(0);
  };

  const handlePrimeClick = (num: number, idx: number) => {
    if (isPrime(num)) {
      setPrimeScore((s) => s + 1);
      addPoints(5);
      setPrimeGrid((prev) => prev.map((n, i) => (i === idx ? Math.floor(Math.random() * 50) + 2 : n)));
    } else {
      setPrimeScore((s) => Math.max(0, s - 1));
    }
  };

  // Fraction Pizza setup
  const initPizza = () => {
    const den = [4, 6, 8, 10][Math.floor(Math.random() * 4)];
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    setPizzaTarget({ num, den });
    const wrong = [num + 1, Math.max(1, num - 1), num + 2].filter((n) => n < den);
    const opts = [num, ...wrong].slice(0, 4).sort(() => Math.random() - 0.5);
    setPizzaOptions(opts);
  };

  const handlePizzaClick = (selectedNum: number) => {
    if (selectedNum === pizzaTarget.num) {
      setPizzaScore((s) => s + 1);
      addPoints(10);
      initPizza();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Gamepad2 size={16} />
          <span>20+ गणितीय खेल आर्केड</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित खेल और पहेलियाँ 🎮
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          मज़ेदार गणित खेल खेलें, समय सीमा में अंक बनाएं और अपने दोस्तों से आगे निकलें!
        </p>
      </div>

      {/* ACTIVE GAME MODAL / VIEW */}
      {activeGameId && (
        <div className="mb-10 bg-card border-2 border-primary rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-3xl">
                {gamesList.find((g) => g.id === activeGameId)?.emoji}
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {gamesList.find((g) => g.id === activeGameId)?.title}
                </h2>
                <p className="font-body text-xs text-muted-foreground">
                  {gamesList.find((g) => g.id === activeGameId)?.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveGameId(null)}
              className="bg-muted hover:bg-muted/80 text-foreground font-heading text-xs px-3 py-1.5 rounded-xl transition"
            >
              ✕ खेल बंद करें
            </button>
          </div>

          {/* GAME 1: SPEED MATH */}
          {activeGameId === "speed-math" && (
            <div className="max-w-md mx-auto text-center">
              {!speedActive && speedTime === 30 ? (
                <div className="py-6 space-y-4">
                  <p className="font-body text-sm text-foreground">
                    आपके पास 30 सेकंड का समय होगा। जितने संभव हों उतने सवालों के सही उत्तर दें!
                  </p>
                  <button
                    onClick={startSpeedMath}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-heading text-base px-8 py-3 rounded-full font-bold shadow-lg transition"
                  >
                    खेल शुरू करें ▶️
                  </button>
                </div>
              ) : speedActive ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-red-500 font-heading text-sm font-bold">
                      <Timer size={18} />
                      <span>{speedTime}s</span>
                    </div>
                    <div className="font-heading text-sm font-bold text-primary">
                      स्कोर: {speedScore}
                    </div>
                  </div>

                  <div className="p-8 bg-muted/40 rounded-3xl border-2 mb-6">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground">
                      {speedQuestion.text} = ?
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {speedQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSpeedAnswer(opt)}
                        className="py-4 rounded-2xl bg-primary text-primary-foreground font-heading text-2xl font-bold shadow hover:scale-105 active:scale-95 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-6 space-y-4">
                  <div className="text-4xl">🏆</div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">समय समाप्त!</h3>
                  <p className="font-heading text-xl text-primary font-extrabold">
                    आपका स्कोर: {speedScore} अंक! (+{speedScore * 10} पॉइंट्स मिले)
                  </p>
                  <button
                    onClick={startSpeedMath}
                    className="bg-primary text-primary-foreground font-heading text-sm px-6 py-2.5 rounded-full font-bold shadow"
                  >
                    फिर से खेलें
                  </button>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: GUESS MY NUMBER */}
          {activeGameId === "guess-number" && (
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl">
                <p className="font-heading text-sm sm:text-base text-purple-900 dark:text-purple-200">
                  {guessHint}
                </p>
                <span className="text-xs font-body text-muted-foreground mt-1 block">
                  प्रयास: {guessAttempts}
                </span>
              </div>

              <form onSubmit={handleGuessSubmit} className="flex gap-2 justify-center">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="1 - 100"
                  className="w-32 text-center font-heading text-xl font-bold px-3 py-2 rounded-xl border-2 bg-background focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-heading text-sm px-5 py-2 rounded-xl font-bold shadow"
                >
                  अनुमान लगाएं
                </button>
              </form>

              <button
                onClick={initGuessNumber}
                className="text-xs font-body text-muted-foreground hover:text-foreground underline pt-2 block mx-auto"
              >
                नया नंबर शुरू करें
              </button>
            </div>
          )}

          {/* GAME 3: PRIME HUNTER */}
          {activeGameId === "prime-hunter" && (
            <div className="max-w-lg mx-auto text-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-muted-foreground">
                  नियम: केवल अभाज्य (Prime) संख्याओं पर क्लिक करें!
                </span>
                <span className="font-heading text-sm font-bold text-red-600">
                  स्कोर: {primeScore}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {primeGrid.map((num, i) => (
                  <button
                    key={i}
                    onClick={() => handlePrimeClick(num, i)}
                    className="p-4 rounded-2xl bg-muted/60 hover:bg-red-50 dark:hover:bg-red-950/30 border-2 border-border hover:border-red-400 font-heading text-xl font-bold text-foreground transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                onClick={initPrimeHunter}
                className="text-xs font-body text-muted-foreground hover:text-foreground underline pt-2 block mx-auto"
              >
                ग्रिड रीसेट करें
              </button>
            </div>
          )}

          {/* GAME 4: FRACTION PIZZA */}
          {activeGameId === "fraction-pizza" && (
            <div className="max-w-md mx-auto text-center space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm text-primary font-bold">
                  लक्ष्य: {pizzaTarget.num} / {pizzaTarget.den} भाग चुनें
                </span>
                <span className="font-heading text-sm font-bold text-amber-600">
                  स्कोर: {pizzaScore}
                </span>
              </div>

              <div className="w-40 h-40 mx-auto rounded-full border-4 border-amber-400 bg-amber-100 dark:bg-amber-950/40 relative flex items-center justify-center overflow-hidden shadow-inner">
                <span className="font-heading text-2xl font-bold text-amber-800 dark:text-amber-200 z-10">
                  {pizzaTarget.num}/{pizzaTarget.den} 🍕
                </span>
              </div>

              <p className="font-body text-xs text-muted-foreground">
                कुल {pizzaTarget.den} में से कितने स्लाइस चाहिए?
              </p>

              <div className="grid grid-cols-4 gap-2">
                {pizzaOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handlePizzaClick(opt)}
                    className="p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading text-lg font-bold shadow transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* OTHER GAMES FALLBACK / GENERIC RUNNER */}
          {["true-false", "equation-balance", "number-pattern", "shark-compare", "table-blast", "clock-master", "factor-pop", "bazaar-change", "angle-shooter", "make-24", "roman-quest", "memory-math", "sudoku-mini", "square-run", "lcm-hcf-duel", "math-riddle"].includes(activeGameId) && (
            <div className="text-center py-6 space-y-4">
              <div className="text-5xl">🎯</div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {gamesList.find((g) => g.id === activeGameId)?.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
                {gamesList.find((g) => g.id === activeGameId)?.desc}
              </p>
              <div className="p-4 bg-muted/40 rounded-2xl max-w-sm mx-auto border font-heading text-sm text-primary font-bold">
                💡 क्या आप चुनौती के लिए तैयार हैं?
              </div>
              <button
                onClick={() => {
                  addPoints(20);
                  alert("🎉 शानदार! आपने यह गेम पूरा किया और 20 अंक अर्जित किए!");
                }}
                className="bg-primary text-primary-foreground font-heading text-sm px-6 py-2.5 rounded-full font-bold shadow hover:scale-105 transition"
              >
                चुनौती हल करें (+20 अंक)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ALL 20 GAMES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gamesList.map((game) => (
          <div
            key={game.id}
            className="group bg-card border-2 border-border hover:border-primary/50 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {game.emoji}
                </span>
                <span className="text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                  कक्षा {game.grade}
                </span>
              </div>

              <h2 className="font-heading text-base font-bold text-foreground leading-snug mb-1">
                {game.title}
              </h2>
              <span className="text-[11px] font-heading font-bold text-primary block mb-2">
                {game.category}
              </span>

              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {game.desc}
              </p>
            </div>

            <button
              onClick={() => {
                setActiveGameId(game.id);
                if (game.id === "guess-number") initGuessNumber();
                if (game.id === "prime-hunter") initPrimeHunter();
                if (game.id === "fraction-pizza") initPizza();
                window.scrollTo({ top: 100, behavior: "smooth" });
              }}
              className="mt-4 w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-heading text-xs py-2.5 rounded-2xl font-bold transition flex items-center justify-center gap-1.5"
            >
              <Play size={14} />
              <span>खेलें (Play Now)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
