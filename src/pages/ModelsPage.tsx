import React, { useState } from "react";
import { Cuboid as Cube, Search, Sparkles, Printer, CheckCircle2, Hammer, BookOpen, Clock } from "lucide-react";
import { detailedModelsData, all100ModelsData } from "../data/modelsData";
import { MathModel } from "../types";

export const ModelsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"detailed" | "bank">("detailed");
  const [activeDetailedNo, setActiveDetailedNo] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");

  const activeModel =
    detailedModelsData.find((m) => m.no === activeDetailedNo) || detailedModelsData[0];

  const filteredBank = all100ModelsData.filter((item) => {
    return (
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Cube size={16} />
          <span>स्कूल गणित मेला व विज्ञान प्रदर्शनी गाइड</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित मॉडल और प्रोजेक्ट्स 📐
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          पाइथागोरस 3D मॉडल, कोण घड़ी, भिन्न चक्र और 100+ गणित मेला मॉडल आइडियाज सामग्री व विधि सहित।
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-muted p-1.5 rounded-2xl flex gap-1">
          <button
            onClick={() => setSelectedTab("detailed")}
            className={`px-5 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold transition ${
              selectedTab === "detailed"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🌟 विस्तृत वर्किंग मॉडल (Detailed Guide)
          </button>
          <button
            onClick={() => setSelectedTab("bank")}
            className={`px-5 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold transition ${
              selectedTab === "bank"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📋 100+ मॉडल विचार बैंक (Ideas Bank)
          </button>
        </div>
      </div>

      {/* TAB 1: DETAILED MODELS */}
      {selectedTab === "detailed" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Selection */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground px-2">
              मॉडल सूची ({detailedModelsData.length})
            </h3>
            <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
              {detailedModelsData.map((m) => {
                const isSelected = activeDetailedNo === m.no;
                return (
                  <button
                    key={m.no}
                    onClick={() => setActiveDetailedNo(m.no)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-md font-bold"
                        : "bg-card border-border hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                        {m.category}
                      </span>
                      <span className="text-[10px] font-body text-muted-foreground">
                        {m.level}
                      </span>
                    </div>
                    <h4 className="font-heading text-sm text-foreground">
                      {m.name}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Model Details */}
          <div className="lg:col-span-8">
            <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header */}
              <div className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-indigo-600 dark:text-indigo-400">
                    {activeModel.category} • {activeModel.level}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                    <Clock size={14} />
                    <span>समय: {activeModel.time}</span>
                  </div>
                </div>

                <h2 className="font-heading text-2xl font-bold text-foreground mt-1">
                  {activeModel.name}
                </h2>
                <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
                  {activeModel.visualDesc}
                </p>
              </div>

              {/* Material */}
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <Hammer size={16} className="text-indigo-500" />
                  <span>आवश्यक सामग्री (Materials)</span>
                </h3>
                <div className="p-3.5 rounded-2xl bg-muted/50 border text-xs font-body text-foreground/90">
                  {activeModel.material}
                </div>
              </div>

              {/* Steps */}
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-500" />
                  <span>बनाने की चरणबद्ध विधि (Steps)</span>
                </h3>
                <div className="space-y-2">
                  {activeModel.steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs font-body flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-heading text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90 leading-relaxed">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Look Like vs Not Like */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
                <div className="p-3.5 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-200">
                  <strong className="font-heading block mb-1">✅ ऐसा दिखना चाहिए:</strong>
                  <span>{activeModel.lookLike}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200">
                  <strong className="font-heading block mb-1">❌ क्या न करें:</strong>
                  <span>{activeModel.notLike}</span>
                </div>
              </div>

              {/* Mathematical Concept */}
              <div className="p-4 rounded-2xl bg-muted/40 border text-xs font-body">
                <strong className="font-heading font-bold text-primary block mb-1">
                  💡 गणितीय सिद्धांत:
                </strong>
                <span>{activeModel.concept}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 100+ IDEAS BANK */}
      {selectedTab === "bank" && (
        <div className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="मॉडल खोजें (उदा. पाइथागोरस, वृत्त, भिन्न, त्रिकोण)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-card text-sm font-body focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBank.map((item) => (
              <div
                key={item.id}
                className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200">
                      कक्षा {item.class}
                    </span>
                  </div>

                  <h4 className="font-heading text-base font-bold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <span className="text-xs font-heading font-bold text-indigo-600 dark:text-indigo-400 block mb-2">
                    {item.cat}
                  </span>

                  <p className="text-xs font-body text-foreground/80 mb-3 leading-relaxed">
                    <strong>कार्यप्रणाली: </strong>{item.working}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60 text-[11px] font-body text-muted-foreground">
                  <strong>सामग्री: </strong>{item.materials}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
