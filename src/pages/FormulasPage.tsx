import React, { useState } from "react";
import { FileText, Search, Copy, Check, Sparkles } from "lucide-react";
import { formulasData } from "../data/formulasData";

export const FormulasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const categories = ["all", ...formulasData.map((c) => c.category)];

  // Flatten items for filtering
  const allFormulas = formulasData.flatMap((cat) =>
    cat.items.map((item) => ({
      category: cat.category,
      name: item.name,
      formula: item.formula,
    }))
  );

  const filteredFormulas = allFormulas.filter((item) => {
    const matchesCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (formula: string, key: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <FileText size={16} />
          <span>80+ गणितीय सूत्र बैंक</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित के महत्वपूर्ण सूत्र 📐
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          अंकगणित, बीजगणित, क्षेत्रमिति, सांख्यिकी और ज्यामिति के सभी सूत्र एक स्थान पर।
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
            placeholder="सूत्र खोजें (उदा. वृत्त, आयत, (a+b)², साधारण ब्याज)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-background text-sm font-body focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-heading text-xs font-bold transition border ${
                selectedCategory === cat
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
              }`}
            >
              {cat === "all" ? "सभी विषय" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Grid */}
      {filteredFormulas.length === 0 ? (
        <div className="text-center p-12 bg-card rounded-3xl border">
          <p className="font-heading text-lg text-foreground mb-1">कोई सूत्र नहीं मिला!</p>
          <p className="font-body text-sm text-muted-foreground">खोज शब्द बदलकर पुनः प्रयास करें।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFormulas.map((item, idx) => {
            const key = `${item.category}-${item.name}-${idx}`;
            return (
              <div
                key={key}
                className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 block w-fit mb-2">
                    {item.category}
                  </span>

                  <h2 className="font-heading text-base font-bold text-foreground mb-3">
                    {item.name}
                  </h2>

                  {/* Formula Box */}
                  <div className="relative bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 rounded-2xl p-4 text-center">
                    <span className="font-mono text-base sm:text-lg font-extrabold text-teal-900 dark:text-teal-200 break-words block">
                      {item.formula}
                    </span>
                    <button
                      onClick={() => handleCopy(item.formula, key)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 dark:bg-black/50 text-muted-foreground hover:text-teal-600 transition"
                      title="सूत्र कॉपी करें"
                    >
                      {copiedKey === key ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
