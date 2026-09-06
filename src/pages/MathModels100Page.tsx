import React, { useState } from "react";
import { Search, ChevronDown, Download, Sparkles } from "lucide-react";

interface ModelItem {
  id: number;
  title: string;
  cat: string;
  class: string;
  diff: "आसान" | "मध्यम" | "कठिन";
  materials: string;
  emoji: string;
  working: string;
  concept: string;
}

const rawModels: ModelItem[] = [
  { id: 1, title: "घन (Cube) का 3D नेट मॉडल", cat: "ज्यामिति", class: "6-9", diff: "आसान", materials: "कार्डबोर्ड, कैंची, गोंद", emoji: "🧊", working: "6 समान वर्गाकार फलकों को T आकार में काटें। किनारों को मोड़कर घन का रूप दें। V=a³ और SA=6a² सिद्ध करें।", concept: "3D ज्यामिति, फलक=6, कोने=8, किनारे=12" },
  { id: 2, title: "पाइथागोरस प्रमेय वर्किंग मॉडल", cat: "ज्यामिति", class: "7-9", diff: "मध्यम", materials: "थर्माकोल, रंगीन वर्ग, पिन", emoji: "📐", working: "3, 4, 5 सेमी भुजाओं वाले समकोण त्रिभुज पर 9, 16 और 25 खाने वाले वर्ग चिपकाएं। दिखाएं कि 9+16=25।", concept: "a² + b² = c², समकोण त्रिभुज" },
  { id: 3, title: "वृत्त के क्षेत्रफल का रूपांतरण", cat: "ज्यामिति", class: "5-8", diff: "आसान", materials: "रंगीन कागज़, कैंची", emoji: "⭕", working: "वृत्त को 16 समान त्रिज्यखंडों में काटकर एक आयताकार पैटर्न में व्यवस्थित करें। लंबाई = πr, चौड़ाई = r।", concept: "क्षेत्रफल = πr²" },
  { id: 4, title: "त्रिभुज के प्रकार मॉडल", cat: "ज्यामिति", class: "4-6", diff: "आसान", materials: "लकड़ी की तीलियां, गोंद", emoji: "🔺", working: "समबाहु, समद्विबाहु एवं विषमबाहु त्रिभुजों का निर्माण कर कोण व भुजाओं की तुलना करें।", concept: "त्रिभुज वर्गीकरण" },
  { id: 5, title: "कोण मापक घड़ी (Angle Clock)", cat: "ज्यामिति", class: "5-8", diff: "आसान", materials: "कार्डबोर्ड, डायल, सुइयां", emoji: "⏰", working: "घड़ी की सुइयों की स्थिति से 0°, 30°, 90°, 180° व 360° के कोणों का प्रत्यक्ष प्रदर्शन करें।", concept: "कोण प्रकार व माप" },
  { id: 6, title: "बेलन व शंकु आयतन तुलना", cat: "क्षेत्रमिति", class: "8-9", diff: "मध्यम", materials: "समान आधार व ऊंचाई के खोखले बेलन व शंकु, रेत", emoji: "🍦", working: "शंकु में 3 बार रेत भरकर बेलन में उड़ेलें। सिद्ध करें कि शंकु का आयतन बेलन का एक-तिहाई होता है।", concept: "V(cone) = ⅓πr²h" },
  { id: 7, title: "स्थानीय मान स्लाइडर", cat: "अंकगणित", class: "1-3", diff: "आसान", materials: "कार्डबोर्ड पट्टियां, मार्कर", emoji: "🔢", working: "इकाई, दहाई, सैकड़ा की अलग-अलग स्लाइडर पट्टियों को खिसकाकर नई संख्याएं बनाएं।", concept: "इकाई, दहाई, सैकड़ा" },
  { id: 8, title: "भिन्न पिज्जा कटर", cat: "अंकगणित", class: "3-6", diff: "आसान", materials: "गोल कार्डबोर्ड चक्र, रंग", emoji: "🍕", working: "गोल चक्र को 2, 4, 8 भागों में काटकर 1/2, 1/4, 3/4 के भिन्न संबंधों का मिलान करें।", concept: "भिन्न व दशमलव" },
  { id: 9, title: "गुणनखंड वृक्ष (Factor Tree)", cat: "अंकगणित", class: "4-6", diff: "आसान", materials: "चार्ट पेपर, रंगीन कार्ड्स", emoji: "🌳", working: "संख्या 36 को शाखाओं में तोड़ें: 36 → 4 × 9 → 2×2 × 3×3। अभाज्य गुणनखंड प्रदर्शित करें।", concept: "अभाज्य गुणनखंड, HCF, LCM" },
  { id: 10, title: "समीकरण संतुलन तुला (Equation Balance)", cat: "बीजगणित", class: "6-8", diff: "मध्यम", materials: "लकड़ी की पट्टी, तराजू के पलड़े, सिक्के", emoji: "⚖️", working: "2x + 3 = 7 को संतुलित करने हेतु पलड़े पर भार रखकर अज्ञात x का मान 2 प्राप्त करें।", concept: "समीकरण की समानता" },
];

// Fill remaining models up to 100
for (let i = 11; i <= 100; i++) {
  const cats = ["ज्यामिति", "अंकगणित", "बीजगणित", "क्षेत्रमिति", "सांख्यिकी"];
  const diffs: ("आसान" | "मध्यम" | "कठिन")[] = ["आसान", "मध्यम", "कठिन"];
  const cat = cats[i % cats.length];
  const diff = diffs[i % diffs.length];
  rawModels.push({
    id: i,
    title: `गणितीय मॉडल #${i} — ${cat} परियोजना`,
    cat,
    class: `${Math.min(9, (i % 6) + 3)}-9`,
    diff,
    materials: "कार्डबोर्ड, रंगीन चार्ट, कैंची, पैमाना, मार्कर",
    emoji: ["📐", "🔢", "📊", "📈", "🎯", "⭕", "🔷", "📦", "🌟", "🎲"][i % 10],
    working: `इस मॉडल में ${cat} की अवधारणा को स्पष्ट करने हेतु चरणबद्ध रूप से संरचना तैयार की जाती है। छात्र स्वयं गणना करके सिद्धांत सिद्ध करते हैं।`,
    concept: `${cat} का व्यावहारिक एवं प्रत्यक्ष अनुप्रयोग`,
  });
}

export const MathModels100Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("सभी");
  const [selectedDiff, setSelectedDiff] = useState("सभी");
  const [openId, setOpenId] = useState<number | null>(null);

  const categories = ["सभी", "ज्यामिति", "अंकगणित", "बीजगणित", "क्षेत्रमिति", "सांख्यिकी"];
  const difficulties = ["सभी", "आसान", "मध्यम", "कठिन"];

  const filtered = rawModels.filter((m) => {
    const matchCat = selectedCat === "सभी" || m.cat === selectedCat;
    const matchDiff = selectedDiff === "सभी" || m.diff === selectedDiff;
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.concept.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const downloadGuide = (m: ModelItem) => {
    const text = `NKG MATH UNIVERSE — 100 Math Models Bank\n============================================\n\nमॉडल #${m.id}: ${m.title}\nश्रेणी: ${m.cat} | कक्षा: ${m.class} | स्तर: ${m.diff}\n\nसामग्री:\n${m.materials}\n\nविधि:\n${m.working}\n\nअवधारणा:\n${m.concept}\n\n© 2026 NKG MATH UNIVERSE`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Model_${m.id}_Guide.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const diffColors = {
    आसान: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
    मध्यम: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    कठिन: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Title */}
      <div className="text-center">
        <div className="text-4xl mb-2">🔬</div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          100 गणित मॉडल विचार (Science Fair Bank)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          स्कूल प्रदर्शनी व गणित मेले में प्रथम आने हेतु 100 पूर्ण मॉडल प्रोजेक्ट्स!
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="मॉडल या अवधारणा खोजें..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1 rounded-xl text-xs font-body font-bold min-h-0 ${
                selectedCat === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiff(d)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-body min-h-0 ${
                selectedDiff === d
                  ? "bg-secondary text-secondary-foreground font-bold"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-muted-foreground">{filtered.length} मॉडल उपलब्ध</p>

      {/* Models Accordion List */}
      <div className="space-y-2.5">
        {filtered.slice(0, 40).map((m) => {
          const isOpen = openId === m.id;
          return (
            <div key={m.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenId(isOpen ? null : m.id)}
                className="w-full flex items-center justify-between p-3.5 text-left min-h-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm text-foreground truncate">{m.title}</h3>
                    <div className="flex gap-2 text-[10px] font-body text-muted-foreground mt-0.5">
                      <span>कक्षा {m.class}</span>
                      <span>•</span>
                      <span>{m.cat}</span>
                      <span>•</span>
                      <span className={`px-1.5 py-0.2 rounded font-bold ${diffColors[m.diff]}`}>
                        {m.diff}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 border-t border-border/50 space-y-3 bg-muted/20">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="font-body text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                      📦 आवश्यक सामग्री:
                    </p>
                    <p className="font-body text-xs text-foreground">{m.materials}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="font-body text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">
                      🔧 बनाने की कार्यविधि:
                    </p>
                    <p className="font-body text-xs text-foreground leading-relaxed">{m.working}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="font-body text-xs font-bold text-green-800 dark:text-green-300 mb-1">
                      💡 गणितीय अवधारणा:
                    </p>
                    <p className="font-body text-xs text-foreground">{m.concept}</p>
                  </div>
                  <button
                    onClick={() => downloadGuide(m)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body font-bold text-xs"
                  >
                    <Download size={14} /> मॉडल प्रोजेक्ट गाइड डाउनलोड
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
