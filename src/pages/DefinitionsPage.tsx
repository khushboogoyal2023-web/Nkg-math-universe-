import React, { useState } from "react";
import { FileQuestion, Search, Volume2, Sparkles } from "lucide-react";
import { definitionsData } from "../data/definitionsData";

export const DefinitionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [speakingTerm, setSpeakingTerm] = useState<string | null>(null);

  const categories = ["all", ...definitionsData.map((c) => c.category)];

  const allDefinitions = definitionsData.flatMap((cat) =>
    cat.items.map((item) => ({
      category: cat.category,
      term: item.term,
      def: item.def,
    }))
  );

  const filteredDefs = allDefinitions.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.def.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const speakDefinition = (term: string, text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(`${term}। ${text}`);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeakingTerm(term);
    utterance.onend = () => setSpeakingTerm(null);
    utterance.onerror = () => setSpeakingTerm(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <FileQuestion size={16} />
          <span>सचित्र गणितीय परिभाषाएं</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित की मुख्य परिभाषाएं 📖
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          बिंदु, रेखाएं, कोण, त्रिभुज, वृत्त, चतुर्भुज और संख्या पद्धति की सभी महत्वपूर्ण परिभाषाएं।
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="परिभाषा खोजें (उदा. समकोण, किरण, समांतर रेखाएं)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-background text-sm font-body focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-heading text-xs font-bold transition border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
              }`}
            >
              {cat === "all" ? "सभी श्रेणियां" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Definitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDefs.map((item, idx) => (
          <div
            key={idx}
            className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                  {item.category}
                </span>
                <button
                  onClick={() => speakDefinition(item.term, item.def)}
                  className={`p-1.5 rounded-lg border text-xs font-body flex items-center gap-1 transition ${
                    speakingTerm === item.term
                      ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                  title="बोलकर सुनाओ"
                >
                  <Volume2 size={14} />
                  <span className="text-[10px]">सुने</span>
                </button>
              </div>

              <h2 className="font-heading text-lg font-bold text-foreground mb-2">
                {item.term}
              </h2>

              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                {item.def}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
