import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Play,
  ArrowRight,
  Sparkles,
  Trophy,
  Brain,
  Calculator,
  Award,
  Gamepad2,
  FileText,
  FileQuestion,
  Lightbulb,
  BookCopy,
  FileDown,
  FlaskConical,
  WandSparkles,
  Blocks,
  Mic,
  FlaskRound,
  Bot
} from "lucide-react";
import { Logo } from "../components/Logo";

const floatingSymbols = ["➕", "➖", "✖️", "➗", "🔢", "📐", "📏", "🧮", "⭐", "🎯", "🏆", "💡"];

const heroStats = [
  { num: "9", label: "कक्षाएं", emoji: "📚", color: "from-purple-400 to-purple-600" },
  { num: "100", label: "पहाड़े", emoji: "🔢", color: "from-orange-400 to-orange-600" },
  { num: "80+", label: "सूत्र", emoji: "📐", color: "from-teal-400 to-teal-600" },
  { num: "20+", label: "खेल", emoji: "🎮", color: "from-yellow-400 to-amber-500" },
  { num: "20+", label: "गणितज्ञ", emoji: "🧑‍🔬", color: "from-red-400 to-rose-500" },
  { num: "16", label: "वैदिक सूत्र", emoji: "🕉️", color: "from-amber-400 to-yellow-500" },
  { num: "50+", label: "क्विज़ सवाल", emoji: "🧠", color: "from-blue-400 to-blue-600" },
  { num: "100+", label: "डेली चैलेंज", emoji: "🎯", color: "from-green-400 to-emerald-500" },
];

const rotatingFacts = [
  "🔢 शून्य (0) और दशमलव भारत की विश्व को अमर देन हैं!",
  "🌀 पाई (π) = 3.14159265... एक अनावर्ती अशांत दशमलव है",
  "✨ 1729 = रामानुजन की विश्व प्रसिद्ध टैक्सी संख्या (1³+12³ = 9³+10³)",
  "🌻 सूरजमुखी और अनानास में फिबोनाची सर्पिल (Fibonacci Spiral) होता है",
  "💎 मोनालिसा के चेहरे और ताजमहल में स्वर्णिम अनुपात (φ = 1.618) है",
  "🔑 इंटरनेट बैंकिंग की सुरक्षा अभाज्य संख्याओं (Prime Numbers) पर टिकी है",
  "🎵 संगीत के सातों सुर गणितीय अनुपातों पर आधारित हैं",
  "♾️ अनंत के भी कई रूप होते हैं — कैंटर का अद्भुत गणितीय सिद्धांत!",
];

const allFeatures = [
  { to: "/classes", emoji: "📚", title: "कक्षा 1 - 9", subtitle: "सभी कक्षाओं का संपूर्ण गणित", gradient: "from-purple-500 to-purple-700" },
  { to: "/tables", emoji: "🔢", title: "पहाड़े (1-100)", subtitle: "1 से 100 तक पहाड़े सीखो", gradient: "from-orange-400 to-orange-600" },
  { to: "/squares-cubes", emoji: "⭐", title: "वर्ग और घन", subtitle: "वर्ग (1-100) व घन (1-50)", gradient: "from-pink-500 to-rose-600" },
  { to: "/formulas", emoji: "📐", title: "गणित सूत्र", subtitle: "सभी महत्वपूर्ण सूत्र एक जगह", gradient: "from-teal-500 to-green-600" },
  { to: "/definitions", emoji: "📖", title: "परिभाषाएं", subtitle: "रेखा, कोण, आकृतियां, संख्याएं", gradient: "from-blue-500 to-indigo-600" },
  { to: "/games", emoji: "🎮", title: "20+ गणित खेल", subtitle: "खेल-खेल में गणित सीखो", gradient: "from-yellow-400 to-amber-600" },
  { to: "/quiz", emoji: "🧠", title: "क्विज़ प्रतियोगिता", subtitle: "कक्षा 1-9 क्विज़ व लीडरबोर्ड", gradient: "from-red-400 to-rose-600" },
  { to: "/daily-challenge", emoji: "🎯", title: "डेली चैलेंज", subtitle: "रोज़ाना 3 सवाल, स्ट्रीक बनाओ", gradient: "from-green-500 to-teal-600" },
  { to: "/workbook", emoji: "📒", title: "वर्कबुक व बोर्ड", subtitle: "सवाल हल करो + व्हाइटबोर्ड", gradient: "from-violet-500 to-purple-700" },
  { to: "/worksheets", emoji: "📄", title: "प्रिंटेबल वर्कशीट", subtitle: "ऑफलाइन अभ्यास हेतु डाउनलोड", gradient: "from-lime-500 to-emerald-600" },
  { to: "/mathematicians", emoji: "🧑‍🔬", title: "महान गणितज्ञ", subtitle: "रामानुजन, आर्यभट्ट से गॉस तक", gradient: "from-orange-500 to-red-600" },
  { to: "/vedic-math", emoji: "🕉️", title: "वैदिक गणित", subtitle: "16 सूत्र — तीव्रतम गणना विधि", gradient: "from-amber-500 to-yellow-600" },
  { to: "/math-tricks", emoji: "🎩", title: "गणित ट्रिक्स", subtitle: "जादुई ट्रिक्स, 6174, 1089", gradient: "from-cyan-500 to-blue-600" },
  { to: "/math-models", emoji: "🏗️", title: "16 गणित मॉडल", subtitle: "प्रदर्शनी हेतु सचित्र गाइड", gradient: "from-fuchsia-500 to-pink-600" },
  { to: "/interactive-models", emoji: "🧊", title: "3D इंटरैक्टिव मॉडल", subtitle: "अबाकस, जियोबोर्ड, कोण चक्र", gradient: "from-indigo-500 to-purple-600" },
  { to: "/math-models-100", emoji: "🔬", title: "100 मॉडल विचार", subtitle: "साइंस फेयर के लिए 100 आइडियाज", gradient: "from-teal-600 to-cyan-700" },
  { to: "/patravachan", emoji: "🎤", title: "पत्रवाचन व PPT", subtitle: "20 भाषण, पूरी स्क्रिप्ट व PPT", gradient: "from-rose-500 to-red-600" },
  { to: "/ai-solver", emoji: "🤖", title: "AI Math Solver", subtitle: "चरण-दर-चरण समाधान पाओ", gradient: "from-purple-600 to-indigo-700" },
  { to: "/virtual-lab", emoji: "🧪", title: "वर्चुअल लैब", subtitle: "20 व्यावहारिक गणित प्रयोग", gradient: "from-emerald-500 to-teal-700" },
  { to: "/study-companion", emoji: "✨", title: "गणित मित्र (AI)", subtitle: "आपका व्यक्तिगत AI शिक्षक", gradient: "from-pink-600 to-violet-700" },
  { to: "/glossary", emoji: "📚", title: "गणित शब्दकोश", subtitle: "65+ महत्वपूर्ण पारिभाषिक शब्द", gradient: "from-blue-600 to-cyan-700" },
  { to: "/progress", emoji: "📊", title: "मेरी प्रगति", subtitle: "स्कोर, स्ट्रीक, बैज संग्रह", gradient: "from-amber-500 to-orange-600" },
];

export const HomePage: React.FC = () => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % rotatingFacts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden pb-12">
      {/* Floating Animated Background Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-20">
        {floatingSymbols.map((sym, idx) => (
          <div
            key={idx}
            className="absolute text-3xl transition-all"
            style={{
              left: `${(idx * 8.3) % 95}%`,
              top: `${(idx * 17) % 85}%`,
            }}
          >
            {sym}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden text-white pt-8 pb-12 px-4 text-center">
        <div
          className="absolute inset-0 z-0 opacity-95"
          style={{
            background:
              "linear-gradient(135deg, hsl(271,76%,48%) 0%, hsl(290,72%,52%) 45%, hsl(32,98%,56%) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Animated Center Logo */}
          <div className="flex justify-center mb-4">
            <Logo size="xl" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 tracking-tight drop-shadow-md">
            NKG MATH UNIVERSE
          </h1>
          <p className="font-body text-lg md:text-xl text-yellow-200 font-bold max-w-xl mx-auto mb-5 drop-shadow">
            कक्षा 1 से 9 तक — गणित की अद्भुत, जादुई और ज्ञानवर्धक दुनिया! 🎉
          </p>

          {/* Rotating Did-You-Know Banner */}
          <div
            className="rounded-2xl px-5 py-3.5 max-w-lg mx-auto mb-6 bg-white/20 backdrop-blur-sm border border-white/30 shadow-md"
          >
            <p className="font-body text-sm md:text-base font-bold text-white transition-all duration-300">
              {rotatingFacts[factIndex]}
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              to="/classes"
              className="bg-white text-purple-700 hover:bg-yellow-300 hover:text-purple-900 font-heading text-base px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all font-bold"
            >
              <BookOpen size={18} />
              <span>सीखना शुरू करें</span>
            </Link>
            <Link
              to="/games"
              className="bg-purple-900/40 hover:bg-purple-900/60 border-2 border-white/50 text-white font-heading text-base px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all font-bold"
            >
              <Play size={18} />
              <span>खेल खेलें 🎮</span>
            </Link>
            <Link
              to="/ai-solver"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-heading text-base px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all font-bold"
            >
              <Brain size={18} />
              <span>AI सॉल्वर 🤖</span>
            </Link>
          </div>

          {/* Animal Emojis */}
          <div className="flex justify-center gap-3 text-3xl select-none">
            <span>🦁</span>
            <span>🐯</span>
            <span>🐼</span>
            <span>🦊</span>
            <span>🦉</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 md:gap-3">
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-2.5 sm:p-3 text-center shadow-md border border-white/30 hover:scale-105 transition-all`}
            >
              <div className="text-xl mb-0.5">{stat.emoji}</div>
              <div className="font-heading text-lg sm:text-xl font-bold">{stat.num}</div>
              <div className="text-[11px] font-body font-semibold opacity-90 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Triple Banner: Daily Challenge, Vedic Math & AI Tutor */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Challenge */}
          <Link
            to="/daily-challenge"
            className="group bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-xs font-body uppercase text-green-100 font-bold">हर दिन 3 नए सवाल</p>
                <h3 className="font-heading text-xl font-bold">डेली चैलेंज</h3>
              </div>
            </div>
            <p className="text-xs font-body text-white/90 mb-3 leading-relaxed">
              स्ट्रीक बनाएं, अंक अर्जित करें और शानदार बैज जीतें!
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-heading font-bold bg-white/20 px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-teal-700 transition">
              अभी खेलें <ArrowRight size={14} />
            </span>
          </Link>

          {/* Vedic Math */}
          <Link
            to="/vedic-math"
            className="group bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🕉️</span>
              <div>
                <p className="text-xs font-body uppercase text-amber-100 font-bold">प्राचीन भारतीय ज्ञान</p>
                <h3 className="font-heading text-xl font-bold">वैदिक गणित (16 सूत्र)</h3>
              </div>
            </div>
            <p className="text-xs font-body text-white/90 mb-3 leading-relaxed">
              98 × 97 = 9506 सिर्फ 5 सेकंड में हल करने के 16 अचूक सूत्र सीखें!
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-heading font-bold bg-white/20 px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-orange-700 transition">
              सूत्र सीखें <ArrowRight size={14} />
            </span>
          </Link>

          {/* AI Math Companion */}
          <Link
            to="/study-companion"
            className="group bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🤖</span>
              <div>
                <p className="text-xs font-body uppercase text-purple-100 font-bold">आपका 24/7 शिक्षक</p>
                <h3 className="font-heading text-xl font-bold">गणित मित्र (AI)</h3>
              </div>
            </div>
            <p className="text-xs font-body text-white/90 mb-3 leading-relaxed">
              किसी भी प्रश्न पर बात करें, संदेह दूर करें और खेल-खेल में समझें!
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-heading font-bold bg-white/20 px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-indigo-700 transition">
              बातचीत शुरू करें <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-heading text-sm mb-2">
            <Sparkles size={16} />
            <span>गणित की सभी विधाएं</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground font-bold">
            आज आप क्या सीखना चाहते हैं?
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {allFeatures.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="group block relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              style={{
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <div className={`bg-gradient-to-br ${item.gradient} p-4 text-white h-full flex flex-col justify-between`}>
                <div>
                  <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform inline-block">
                    {item.emoji}
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold leading-tight drop-shadow-xs">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-white/85 mt-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-heading font-bold bg-white/20 rounded-full px-2.5 py-1 w-fit">
                  <span>खोलें</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Motivational Banner */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 dark:from-purple-950/40 dark:via-pink-950/40 dark:to-amber-950/40 border-2 border-primary/30 rounded-3xl p-6 text-center shadow-md">
          <div className="text-4xl mb-2">🌟</div>
          <h3 className="font-heading text-xl md:text-2xl text-primary font-bold mb-2">
            गणित सबके लिए है!
          </h3>
          <p className="font-body text-sm text-foreground/80 max-w-lg mx-auto mb-4 leading-relaxed">
            आर्यभट्ट, ब्रह्मगुप्त, रामानुजन और शकुंतला देवी ने सिद्ध किया कि जिज्ञासा और निरंतर अभ्यास से कोई भी गणित का उस्ताद बन सकता है!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/mathematicians"
              className="bg-primary text-primary-foreground font-heading text-sm px-5 py-2.5 rounded-full shadow hover:scale-105 transition"
            >
              🧑‍🔬 महान गणितज्ञ पढ़ें
            </Link>
            <Link
              to="/math-tricks"
              className="bg-orange-500 text-white font-heading text-sm px-5 py-2.5 rounded-full shadow hover:scale-105 transition"
            >
              🎩 जादुई ट्रिक्स देखें
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
