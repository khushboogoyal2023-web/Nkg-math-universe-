import React, { useState } from "react";
import { BookOpen, Search, Volume2, Sparkles } from "lucide-react";
import { glossaryData } from "../data/glossaryData";
import { GlossaryTerm } from "../types";

export const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const letters = ["all", "अ", "आ", "इ", "उ", "ए", "क", "ख", "ग", "च", "ज", "त", "द", "न", "प", "ब", "म", "य", "र", "ल", "व", "स", "ह"];

  const filteredGlossary = glossaryData.filter((item) => {
    const matchesLetter =
      selectedLetter === "all" || item.term.startsWith(selectedLetter);
    const matchesSearch =
      searchTerm === "" ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  const speak = (term: string, en: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(`${term}। In English: ${en}.`);
    u.lang = "hi-IN";
    u.onstart = () => setSpeakingWord(term);
    u.onend = () => setSpeakingWord(null);
    u.onerror = () => setSpeakingWord(null);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <BookOpen size={16} />
          <span>द्विभाषी गणितीय शब्दकोश (Bilingual Dictionary)</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित शब्दावली (Glossary) 📚
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          हिंदी और अंग्रेज़ी में गणित के सभी तकनीकी शब्दों का विस्तृत अर्थ एवं उदाहरण।
        </p>
      </div>

      {/* Filter and Alphabet Bar */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="शब्द खोजें (उदा. भिन्न, त्रिज्या, Fraction, Radius, Polynomial)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-background text-sm font-body focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Hindi Alphabet Strip */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-heading font-bold text-muted-foreground mr-1">वर्ण:</span>
          {letters.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedLetter(char)}
              className={`w-7 h-7 rounded-lg font-heading text-xs font-bold transition flex items-center justify-center ${
                selectedLetter === char
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {char === "all" ? "सभी" : char}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGlossary.map((item, idx) => (
          <div
            key={idx}
            className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {item.term}
                  </h3>
                  <span className="text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400">
                    {item.en}
                  </span>
                </div>

                <button
                  onClick={() => speak(item.term, item.en)}
                  className={`p-1.5 rounded-lg border text-xs transition ${
                    speakingWord === item.term
                      ? "bg-emerald-600 text-white border-emerald-600 animate-pulse"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                  title="उच्चारण सुने"
                >
                  <Volume2 size={15} />
                </button>
              </div>

              <p className="font-body text-xs text-foreground/80 leading-relaxed mb-3">
                {item.definition}
              </p>
            </div>

            {item.formula && (
              <div className="pt-2.5 border-t border-border/70 text-[11px] font-mono bg-muted/30 rounded-xl p-2.5 text-foreground font-bold">
                <span className="text-primary font-heading mr-1 font-bold">सूत्र / रूप: </span>
                <span>{item.formula}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
