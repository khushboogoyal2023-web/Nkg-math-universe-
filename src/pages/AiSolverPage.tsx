import React, { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const AiSolverPage: React.FC = () => {
  const [problemText, setProblemText] = useState("");
  const [selectedClass, setSelectedClass] = useState("5");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { addPoints } = useApp();

  const sampleQuestions = [
    "हल करें: 3x + 15 = 45 में x का मान क्या होगा?",
    "एक आयताकार मैदान की लंबाई 25 मीटर और चौड़ाई 16 मीटर है। इसका परिमाप और क्षेत्रफल निकालें।",
    "वैदिक विधि से 96 × 94 का मान 5 सेकंड में कैसे ज्ञात करें?",
    "यदि किसी वृत्त की त्रिज्या 14 सेमी है, तो उसकी परिधि और क्षेत्रफल (π=22/7) निकालें।",
    "रामू के पास ₹120 थे। उसने ⅓ भाग किताबों पर खर्च किया। उसके पास कितने रुपये शेष बचे?",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSolve = async () => {
    if (!problemText.trim() && !imagePreview) {
      alert("कृपया कोई सवाल लिखें या सवाल की फोटो अपलोड करें!");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSolution(null);

    try {
      const response = await fetch("/api/ai-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: problemText,
          classLevel: selectedClass,
          image: imagePreview,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "समाधान प्राप्त करने में समस्या आई।");
      }

      setSolution(data);
      addPoints(15);
    } catch (err: any) {
      console.error("AI Solver error:", err);
      setErrorMsg(err.message || "त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySolution = () => {
    if (!solution) return;
    const textToCopy = `प्रश्न: ${problemText}\n\nअंतिम उत्तर: ${solution.finalAnswer}\n\nचरणबद्ध हल:\n${solution.steps?.map((s: any) => `${s.step}. ${s.explanation}`).join("\n")}\n\nसूत्र: ${solution.formulaUsed}\nटिप: ${solution.tip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakSolution = () => {
    if (!("speechSynthesis" in window) || !solution) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const text = `अंतिम उत्तर है: ${solution.finalAnswer}। ${solution.steps?.map((s: any) => s.explanation).join("। ")}`;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "hi-IN";
      u.rate = 0.9;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1.5 rounded-full font-heading text-sm mb-3 shadow-md">
          <BrainCircuit size={16} />
          <span>Gemini 2.5 Flash AI पावर्ड मैथ सॉल्वर</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          एआई गणित समाधानकर्ता 🤖
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          कक्षा 1 से 9 तक का कोई भी गणित सवाल लिखें या फोटो अपलोड करें — चरणबद्ध व्याख्या और वैदिक शॉर्टकट के साथ तुरंत समझें!
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm space-y-5 mb-8">
        {/* Class Selection & Quick Preset */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold text-muted-foreground">कक्षा स्तर:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-xl border bg-background font-heading text-xs font-bold focus:outline-none focus:border-primary"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                <option key={c} value={c.toString()}>
                  कक्षा {c}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[11px] font-body text-primary font-bold">
            ✨ हिंदी व अंग्रेज़ी दोनों भाषाओं में उपलब्ध
          </span>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={4}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="अपना सवाल यहाँ लिखें (उदा. एक समकोण त्रिभुज में लम्ब 6 सेमी व आधार 8 सेमी है, कर्ण क्या होगा?)..."
            className="w-full p-4 rounded-2xl border-2 border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Image Upload Option */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border text-xs font-heading font-bold text-foreground transition">
              <Upload size={14} className="text-primary" />
              <span>सवाल की फोटो अपलोड करें</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagePreview && (
              <div className="relative flex items-center gap-2">
                <img
                  src={imagePreview}
                  alt="Uploaded problem"
                  className="w-10 h-10 object-cover rounded-lg border"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="text-xs text-destructive hover:underline"
                >
                  हटाएं
                </button>
              </div>
            )}
          </div>

          {/* Solve Button */}
          <button
            onClick={handleSolve}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-heading text-sm px-6 py-2.5 rounded-2xl font-bold shadow-lg transition flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles size={16} className="animate-spin" />
                <span>AI हल कर रहा है...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>चरणबद्ध हल निकालें (+15 pts)</span>
              </>
            )}
          </button>
        </div>

        {/* Sample Prompts Strip */}
        <div className="pt-2">
          <span className="text-[11px] font-heading font-bold text-muted-foreground block mb-2">
            💡 उदाहरण सवाल (क्लिक करके आज़माएँ):
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setProblemText(q)}
                className="text-left text-xs font-body bg-muted/50 hover:bg-muted p-2 rounded-xl border text-foreground/80 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-2xl text-destructive text-sm font-body mb-6">
          {errorMsg}
        </div>
      )}

      {/* SOLUTION DISPLAY */}
      {solution && (
        <div className="bg-card border-2 border-primary/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Solution Header & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-green-500/10 text-green-600 rounded-xl">
                <CheckCircle2 size={24} />
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  सटीक समाधान (Step-by-Step Solution)
                </h3>
                <span className="text-xs font-body text-muted-foreground">
                  कक्षा {selectedClass} के स्तर अनुसार व्याख्या
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={speakSolution}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-heading font-bold flex items-center gap-1.5 transition border"
                title="बोलकर सुनो"
              >
                <Volume2 size={16} />
                <span>{speaking ? "रोकें" : "सुनें"}</span>
              </button>
              <button
                onClick={handleCopySolution}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-heading font-bold flex items-center gap-1.5 transition border"
                title="कॉपी करें"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                <span>{copied ? "कॉपी हुआ!" : "कॉपी"}</span>
              </button>
            </div>
          </div>

          {/* Final Answer Big Highlight Box */}
          <div className="bg-gradient-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 border-2 border-primary/30 rounded-2xl p-5 text-center">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              🎯 अंतिम उत्तर (Final Answer)
            </span>
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
              {solution.finalAnswer}
            </span>
          </div>

          {/* Step-by-Step breakdown */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-foreground">
              चरणबद्ध हल (Step-by-Step Breakdown):
            </h4>
            {solution.steps?.map((st: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-muted/40 border border-border flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-xs font-bold flex-shrink-0 mt-0.5">
                  {st.step || idx + 1}
                </span>
                <div className="flex-1 text-sm font-body leading-relaxed text-foreground">
                  <p>{st.explanation}</p>
                  {st.math && (
                    <div className="mt-1 font-mono text-xs font-bold text-primary bg-background/80 p-2 rounded-lg border inline-block">
                      {st.math}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formula Used */}
          {solution.formulaUsed && (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs font-body text-blue-950 dark:text-blue-200">
              <strong className="font-heading block mb-0.5">📐 प्रयुक्त सूत्र (Formula Used):</strong>
              <span>{solution.formulaUsed}</span>
            </div>
          )}

          {/* Pro Tip / Vedic Shortcut */}
          {solution.tip && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs font-body text-amber-950 dark:text-amber-200">
              <strong className="font-heading block mb-0.5">💡 स्मार्ट टिप / वैदिक शॉर्टकट:</strong>
              <span>{solution.tip}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
