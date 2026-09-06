import React, { useState } from "react";
import { Lightbulb, Shapes, Hash, BarChart3 } from "lucide-react";

export const GeneralMathPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"facts" | "shapes" | "numbers" | "places">("facts");

  const facts = [
    "शून्य (0) न तो धनात्मक संख्या है और न ही ऋणात्मक।",
    "π (पाई) = 3.14159265... यह एक अपरिमेय संख्या है जो कभी समाप्त नहीं होती।",
    "संख्या 1 न तो अभाज्य संख्या है और न ही भाज्य संख्या।",
    "111111111 × 111111111 = 12345678987654321 (एक अद्भुत गणितीय पिरामिड)।",
    "रोमन अंक प्रणाली में शून्य (0) के लिए कोई प्रतीक नहीं होता।",
    "गोलाकार (Sphere) आकृति का कोई कोना अथवा किनारा नहीं होता।",
    "संख्या 2 एकमात्र सम अभाज्य संख्या (Even Prime Number) है।",
    "अंग्रेजी शब्द 'FOUR' एकमात्र संख्या है जिसके अक्षरों की गिनती उसके मान (4) के बराबर है।",
    "गूगोल (Googol) का मान 1 के आगे 100 शून्य (10¹⁰⁰) होता है।",
    "पाइथागोरस प्रमेय 2500 वर्षों से अधिक समय से गणित की रीढ़ बनी हुई है।",
  ];

  const shapes = [
    { name: "वृत्त (Circle)", emoji: "⭕", props: "कोई कोना नहीं, 1 वक्र परिधि, अनंत सममिति रेखाएं।" },
    { name: "त्रिभुज (Triangle)", emoji: "🔺", props: "3 भुजाएं, 3 कोण, सभी कोणों का योग सदा 180° होता है।" },
    { name: "वर्ग (Square)", emoji: "🟧", props: "4 समान भुजाएं, चारों कोण 90° (समकोण), विकर्ण बराबर व लंबवत।" },
    { name: "आयत (Rectangle)", emoji: "🟦", props: "आमने-सामने की भुजाएं बराबर, चारों कोण समकोण (90°)।" },
    { name: "समांतर चतुर्भुज", emoji: "🔷", props: "सम्मुख भुजाएं समानांतर व बराबर, सम्मुख कोण बराबर।" },
    { name: "समचतुर्भुज (Rhombus)", emoji: "💎", props: "चारों भुजाएं बराबर, विकर्ण एक-दूसरे को 90° पर काटते हैं।" },
    { name: "समलंब (Trapezium)", emoji: "⬛", props: "भुजाओं का केवल एक जोड़ा समानांतर होता है।" },
    { name: "पंचभुज (Pentagon)", emoji: "⬠", props: "5 भुजाएं, 5 कोण, सभी आंतरिक कोणों का योग 540° होता है।" },
    { name: "षट्भुज (Hexagon)", emoji: "⬡", props: "6 भुजाएं, 6 कोण, सभी आंतरिक कोणों का योग 720° होता है।" },
  ];

  const hindiNumbers = [
    { n: "1", hindi: "एक" },
    { n: "2", hindi: "दो" },
    { n: "3", hindi: "तीन" },
    { n: "4", hindi: "चार" },
    { n: "5", hindi: "पाँच" },
    { n: "6", hindi: "छः" },
    { n: "7", hindi: "सात" },
    { n: "8", hindi: "आठ" },
    { n: "9", hindi: "नौ" },
    { n: "10", hindi: "दस" },
    { n: "20", hindi: "बीस" },
    { n: "30", hindi: "तीस" },
    { n: "40", hindi: "चालीस" },
    { n: "50", hindi: "पचास" },
    { n: "60", hindi: "साठ" },
    { n: "70", hindi: "सत्तर" },
    { n: "80", hindi: "अस्सी" },
    { n: "90", hindi: "नब्बे" },
    { n: "100", hindi: "सौ" },
    { n: "1,000", hindi: "एक हज़ार" },
    { n: "1,00,000", hindi: "एक लाख" },
    { n: "1,00,00,000", hindi: "एक करोड़" },
  ];

  const placeValues = [
    { place: "इकाई (Units)", value: "1", example: "7" },
    { place: "दहाई (Tens)", value: "10", example: "70" },
    { place: "सैकड़ा (Hundreds)", value: "100", example: "700" },
    { place: "हज़ार (Thousands)", value: "1,000", example: "7,000" },
    { place: "दस हज़ार (Ten Thousands)", value: "10,000", example: "70,000" },
    { place: "लाख (Lakh)", value: "1,00,000", example: "7,00,000" },
    { place: "दस लाख (Ten Lakh)", value: "10,00,000", example: "70,00,000" },
    { place: "करोड़ (Crore)", value: "1,00,00,000", example: "7,00,00,000" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-3xl p-4 shadow-xl">
            <Lightbulb size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          💡 गणित का सामान्य ज्ञान (General Math)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          संख्याओं, आकृतियों और गणितीय चमत्कारों का रोचक संग्रह!
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-muted/60 p-1 rounded-2xl border border-border/50 max-w-xl mx-auto">
        {[
          { id: "facts" as const, label: "🌟 रोचक तथ्य", icon: Lightbulb },
          { id: "shapes" as const, label: "🔷 आकृतियाँ", icon: Shapes },
          { id: "numbers" as const, label: "🔢 हिंदी गिनती", icon: Hash },
          { id: "places" as const, label: "📊 स्थानीय मान", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-xl font-heading text-xs transition-all min-h-0 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Facts */}
      {activeTab === "facts" && (
        <div className="space-y-2.5">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="bg-card border rounded-2xl p-4 flex items-start gap-3 shadow-sm hover:border-primary/40 transition"
            >
              <span className="text-xl">💡</span>
              <p className="font-body text-xs md:text-sm text-foreground leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Shapes */}
      {activeTab === "shapes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {shapes.map((sh, i) => (
            <div
              key={i}
              className="bg-card border rounded-2xl p-4 text-center shadow-sm hover:scale-[1.02] transition"
            >
              <div className="text-4xl mb-2">{sh.emoji}</div>
              <h3 className="font-heading text-base text-primary mb-1">{sh.name}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{sh.props}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Hindi Numbers */}
      {activeTab === "numbers" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {hindiNumbers.map((num, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-3 text-center shadow-sm"
            >
              <div className="font-heading text-xl font-bold">{num.n}</div>
              <div className="font-body text-xs opacity-90">{num.hindi}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Place Values */}
      {activeTab === "places" && (
        <div className="space-y-2">
          {placeValues.map((pv, i) => (
            <div
              key={i}
              className="bg-card border rounded-2xl p-3.5 flex items-center justify-between shadow-sm"
            >
              <div>
                <h3 className="font-heading text-sm text-primary">{pv.place}</h3>
                <p className="font-body text-xs text-muted-foreground">मान: {pv.value}</p>
              </div>
              <div className="bg-primary/10 text-primary font-mono text-xs font-bold px-3 py-1.5 rounded-xl">
                उदाहरण: {pv.example}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
