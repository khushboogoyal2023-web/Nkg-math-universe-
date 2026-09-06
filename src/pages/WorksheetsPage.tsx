import React, { useState } from "react";
import { FileDown, Printer, RefreshCw, CheckCircle2, Sparkles } from "lucide-react";

interface WorksheetPreset {
  id: string;
  title: string;
  classNum: number;
  category: string;
  questions: string[];
}

const worksheetPresets: WorksheetPreset[] = [
  {
    id: "c1-add",
    title: "कक्षा 1: सरल जोड़ अभ्यास (1-20)",
    classNum: 1,
    category: "अंकगणित",
    questions: [
      "3 + 4 = ____", "5 + 2 = ____", "8 + 1 = ____", "6 + 6 = ____", "7 + 3 = ____",
      "9 + 4 = ____", "2 + 8 = ____", "10 + 5 = ____", "4 + 7 = ____", "12 + 3 = ____"
    ]
  },
  {
    id: "c2-sub",
    title: "कक्षा 2: घटाव एवं हासिल जोड़",
    classNum: 2,
    category: "अंकगणित",
    questions: [
      "25 + 17 = ____", "42 - 18 = ____", "50 - 23 = ____", "36 + 29 = ____", "80 - 45 = ____",
      "15 × 2 = ____", "3 × 6 = ____", "4 × 5 = ____", "60 - 28 = ____", "33 + 47 = ____"
    ]
  },
  {
    id: "c3-mult",
    title: "कक्षा 3: गुणा व भाग सारणी",
    classNum: 3,
    category: "गुणा-भाग",
    questions: [
      "6 × 7 = ____", "8 × 9 = ____", "45 ÷ 5 = ____", "36 ÷ 4 = ____", "12 × 4 = ____",
      "7 × 8 = ____", "54 ÷ 6 = ____", "9 × 7 = ____", "64 ÷ 8 = ____", "11 × 5 = ____"
    ]
  },
  {
    id: "c4-geom",
    title: "कक्षा 4: परिमाप, क्षेत्रफल और भिन्न",
    classNum: 4,
    category: "क्षेत्रमिति",
    questions: [
      "भुजा 6 सेमी वाले वर्ग का परिमाप = ____",
      "लंबाई 8 सेमी और चौड़ाई 5 सेमी वाले आयत का क्षेत्रफल = ____",
      "1/2 + 1/4 = ____",
      "3/4 - 1/4 = ____",
      "समकोण कितने डिग्री का होता है? = ____",
      "1 किलोग्राम में कितने ग्राम होते हैं? = ____",
      "0.5 को भिन्न में लिखें = ____",
      "1 मीटर में कितने सेंटीमीटर होते हैं? = ____",
      "वृत्त का व्यास यदि 10 सेमी है, तो त्रिज्या = ____",
      "450 + 275 = ____"
    ]
  },
  {
    id: "c5-hcf-lcm",
    title: "कक्षा 5: ल.स., म.स. और प्रतिशत",
    classNum: 5,
    category: "संख्याएं",
    questions: [
      "12 और 18 का HCF = ____",
      "4 और 6 का LCM = ____",
      "200 का 15% = ____",
      "500 का 25% = ____",
      "क्रम में अगला पद: 2, 5, 10, 17, ____",
      "3/5 को प्रतिशत में बदलो = ____",
      "10, 20, 30 का औसत = ____",
      "क्रय मूल्य = ₹100, विक्रय मूल्य = ₹125, लाभ% = ____",
      "12 × 12 = ____",
      "वर्गमूल: √81 = ____"
    ]
  },
  {
    id: "c6-integers",
    title: "कक्षा 6: पूर्णांक और सरल समीकरण",
    classNum: 6,
    category: "बीजगणित",
    questions: [
      "(-8) + (+15) = ____",
      "(-6) × (-7) = ____",
      "2x + 5 = 17, तो x = ____",
      "3y - 4 = 11, तो y = ____",
      "अनुपात 12 : 18 का सरलतम रूप = ____",
      "एक त्रिभुज के कोण 50° और 60° हैं, तीसरा कोण = ____",
      "वृत्त का क्षेत्रफल यदि r = 7 सेमी (π = 22/7) = ____",
      "(-15) ÷ (-3) = ____",
      "5x = 40, तो x = ____",
      "समचतुर्भुज के विकर्ण 6 व 8 सेमी हैं, क्षेत्रफल = ____"
    ]
  },
  {
    id: "c7-rational",
    title: "कक्षा 7: घातांक, परिमेय संख्याएं और त्रिभुज",
    classNum: 7,
    category: "उन्नत अंकगणित",
    questions: [
      "2⁵ × 2³ = 2^(____)",
      "(3²)³ = 3^(____)",
      "5⁰ = ____",
      "साधारण ब्याज: P = ₹1000, R = 10%, T = 2 वर्ष, SI = ____",
      "समकोण त्रिभुज में आधार = 3, लम्ब = 4, तो कर्ण = ____",
      "(-2/3) + (5/6) = ____",
      "पूरक कोण: 65° का पूरक = ____",
      "संपूरक कोण: 110° का संपूरक = ____",
      "समांतर चतुर्भुज का क्षेत्रफल (b = 10, h = 6) = ____",
      "3x + 2x - 7 = 18, तो x = ____"
    ]
  },
  {
    id: "c8-algebra",
    title: "कक्षा 8: सर्वसमिकाएं, घनमूल और क्षेत्रमिति",
    classNum: 8,
    category: "बीजगणित व 3D",
    questions: [
      "(a + b)² = a² + ____ + b²",
      "(a - b)² = a² - ____ + b²",
      "a² - b² = (a + b)(____)",
      "घनमूल: ∛125 = ____",
      "वर्गमूल: √256 = ____",
      "बेलन का आयतन यदि r = 7 सेमी, h = 10 सेमी = ____",
      "घन का कुल पृष्ठीय क्षेत्रफल यदि a = 5 सेमी = ____",
      "घनाभ का आयतन (l=4, b=3, h=2) = ____",
      "समलंब का क्षेत्रफल: h = 6, a = 8, b = 12 = ____",
      "चक्रवृद्धि ब्याज सूत्र में A = P(1 + ____)^n"
    ]
  },
  {
    id: "c9-polynomials",
    title: "कक्षा 9: बहुपद, निर्देशांक ज्यामिति और हीरोन सूत्र",
    classNum: 9,
    category: "माध्यमिक स्तर",
    questions: [
      "हीरोन सूत्र: त्रिभुज की भुजाएं 3, 4, 5 सेमी हैं, क्षेत्रफल = ____",
      "यदि x + 1/x = 4 हो, तो x² + 1/x² = ____",
      "बिंदु (-3, 4) किस चतुर्थांश में स्थित है? = ____",
      "मूल बिंदु के निर्देशांक = ____",
      "गोले का पृष्ठीय क्षेत्रफल यदि r = 7 सेमी = ____",
      "शंकु का आयतन: ⅓πr²h",
      "बहुपद p(x) = x² - 4 का शून्यक = ____",
      "चक्रीय चतुर्भुज के सम्मुख कोणों का योग = ____",
      "√2 कैसी संख्या है? (परिमेय / अपरिमेय) = ____",
      "2³³ का इकाई अंक = ____"
    ]
  }
];

export const WorksheetsPage: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("c5-hcf-lcm");

  const currentPreset =
    worksheetPresets.find((p) => p.id === selectedPresetId) || worksheetPresets[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 print:hidden">
        <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-700 dark:text-lime-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <FileDown size={16} />
          <span>प्रिंटेबल अभ्यास पत्रिकाएं</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित वर्कशीट जेनरेटर 📄
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          कक्षा 1 से 9 तक की रेडी-टू-प्रिंट वर्कशीट। प्रिंट करें या पीडीएफ के रूप में सहेजें!
        </p>
      </div>

      {/* Class and Topic Selector (Hidden when printing) */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-8 print:hidden space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-foreground">
            वर्कशीट चुनें (कक्षा 1-9):
          </span>
          <button
            onClick={handlePrint}
            className="bg-lime-600 hover:bg-lime-700 text-white font-heading text-xs sm:text-sm px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow transition"
          >
            <Printer size={16} />
            <span>प्रिंट या PDF सेव करें</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {worksheetPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`p-3 rounded-2xl border-2 text-left font-body text-xs font-bold transition flex items-center justify-between ${
                selectedPresetId === preset.id
                  ? "bg-lime-50 dark:bg-lime-950/40 border-lime-600 text-lime-900 dark:text-lime-200 shadow-sm"
                  : "bg-background border-border text-foreground hover:bg-muted"
              }`}
            >
              <span>{preset.title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                कक्षा {preset.classNum}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Printable Sheet Box */}
      <div className="bg-white text-black p-8 sm:p-12 rounded-3xl border-4 border-slate-300 shadow-2xl print:border-none print:shadow-none print:p-0">
        {/* Worksheet Header */}
        <div className="border-b-2 border-black pb-4 mb-6 text-center space-y-1">
          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-wider text-black">
            NKG MATH UNIVERSE
          </h2>
          <p className="font-body text-sm font-bold text-slate-700">
            {currentPreset.title}
          </p>
          <div className="pt-4 grid grid-cols-3 gap-4 text-xs font-body font-bold text-left border-t border-slate-300 mt-3">
            <div>छात्र का नाम: _______________________</div>
            <div>अनुक्रमांक (Roll No): ________</div>
            <div>दिनांक: ________________</div>
          </div>
          <div className="flex justify-between text-xs font-body font-bold text-slate-700 pt-1">
            <span>कक्षा: {currentPreset.classNum}</span>
            <span>कुल अंक: 20</span>
            <span>प्राप्तांक: ______ / 20</span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs font-body italic text-slate-600 mb-6 text-center">
          * सभी प्रश्न अनिवार्य हैं। प्रत्येक प्रश्न 2 अंक का है। अपने उत्तर रिक्त स्थान में लिखें।
        </p>

        {/* Questions List (2-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {currentPreset.questions.map((q, idx) => (
            <div
              key={idx}
              className="border-b border-dashed border-slate-300 pb-3 flex items-start justify-between gap-3 text-sm font-body"
            >
              <span className="font-bold flex-shrink-0">{idx + 1}.</span>
              <span className="flex-1 font-medium">{q}</span>
              <span className="w-16 border-b border-black flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Worksheet Footer */}
        <div className="mt-12 pt-6 border-t-2 border-black flex items-center justify-between text-xs font-body font-bold text-slate-600">
          <span>शिक्षक हस्ताक्षर: ___________________</span>
          <span>रिमार्क: 🌟 उत्कृष्ट / अच्छा / अभ्यास करें</span>
        </div>
      </div>
    </div>
  );
};
