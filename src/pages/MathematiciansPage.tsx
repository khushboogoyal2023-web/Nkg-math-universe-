import React, { useState } from "react";
import { FlaskConical, Search, Sparkles, MapPin, Calendar, Award, X, BookOpen } from "lucide-react";
import { mathematiciansData } from "../data/mathematiciansData";
import { Mathematician } from "../types";

export const MathematiciansPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<"all" | "indian" | "world">("all");
  const [selectedMath, setSelectedMath] = useState<Mathematician | null>(null);

  const filteredList = mathematiciansData.filter((item) => {
    const isIndian = item.country.includes("भारत");
    const matchesRegion =
      regionFilter === "all" ||
      (regionFilter === "indian" && isIndian) ||
      (regionFilter === "world" && !isIndian);

    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contributions.some((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.detail.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <FlaskConical size={16} />
          <span>विश्व के अमर गणितज्ञ</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          महान गणितज्ञ जीवनी और खोजें 🧑‍🔬
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          रामानुजन, आर्यभट्ट, ब्रह्मगुप्त, गॉस, यूलर और पाइथागोरस के अद्भुत जीवन और योगदान की अमर गाथा।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search size={18} className="absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="गणितज्ञ या खोज का नाम खोजें (उदा. रामानुजन, शून्य, 1729)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background text-sm font-body focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "indian", "world"] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => setRegionFilter(reg)}
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold transition border ${
                regionFilter === reg
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:bg-muted"
              }`}
            >
              {reg === "all" ? "सभी (All)" : reg === "indian" ? "🇮🇳 भारतीय गणितज्ञ" : "🌍 विश्व गणितज्ञ"}
            </button>
          ))}
        </div>
      </div>

      {/* Mathematicians Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedMath(item)}
            className="group cursor-pointer bg-card border-2 border-border hover:border-orange-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Top Color Banner */}
            <div className={`bg-gradient-to-r ${item.color} p-5 text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="bg-white/20 text-white text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full">
                  {item.years}
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold mt-2 text-white">
                {item.name}
              </h2>
              <p className="text-xs text-white/90 font-body mt-0.5">
                {item.title}
              </p>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-body text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                  {item.about}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground block">
                    प्रमुख योगदान:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.contributions.slice(0, 2).map((c, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-body bg-muted px-2.5 py-1 rounded-lg text-foreground/80 font-medium"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-orange-600 dark:text-orange-400 text-xs font-heading font-bold">
                <span>पूरी जीवनी व प्रसंग पढ़ें</span>
                <span>❯</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {selectedMath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border-2 border-border text-foreground w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedMath.color} text-white p-6 relative`}>
              <button
                onClick={() => setSelectedMath(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-5xl">{selectedMath.emoji}</span>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {selectedMath.name}
                  </h3>
                  <p className="text-xs text-white/90 font-body">
                    {selectedMath.years} • {selectedMath.country}
                  </p>
                  <p className="text-xs text-yellow-200 font-heading font-bold mt-0.5">
                    {selectedMath.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Bio Details */}
              <div className="grid grid-cols-2 gap-3 text-xs font-body bg-muted/40 p-3.5 rounded-2xl border">
                <div>
                  <strong className="text-foreground font-heading">जन्म: </strong>
                  <span className="text-muted-foreground">{selectedMath.born}</span>
                </div>
                <div>
                  <strong className="text-foreground font-heading">निधन: </strong>
                  <span className="text-muted-foreground">{selectedMath.died}</span>
                </div>
              </div>

              {/* About */}
              <div>
                <h4 className="font-heading text-base font-bold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-orange-500" />
                  <span>जीवन परिचय (Biography)</span>
                </h4>
                <p className="font-body text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {selectedMath.about}
                </p>
              </div>

              {/* Key Contributions */}
              <div>
                <h4 className="font-heading text-base font-bold text-foreground mb-2 flex items-center gap-2">
                  <Award size={16} className="text-orange-500" />
                  <span>अमर खोजें एवं योगदान</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedMath.contributions.map((c, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-muted/50 border text-xs font-body space-y-1"
                    >
                      <h5 className="font-heading font-bold text-orange-600 dark:text-orange-400">
                        {c.title}
                      </h5>
                      <p className="text-foreground/80 leading-relaxed">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              {selectedMath.funFacts && selectedMath.funFacts.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs font-body">
                  <h4 className="font-heading font-bold text-amber-900 dark:text-amber-200 mb-2">
                    💡 रोचक तथ्य (Fun Facts):
                  </h4>
                  <ul className="space-y-1 text-amber-950 dark:text-amber-100">
                    {selectedMath.funFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  onClick={() => setSelectedMath(null)}
                  className="bg-primary text-primary-foreground font-heading text-sm px-6 py-2 rounded-full font-bold shadow"
                >
                  बंद करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
