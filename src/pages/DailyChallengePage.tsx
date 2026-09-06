import React, { useState } from "react";
import { Trophy, Flame, CheckCircle2, XCircle, Sparkles, Calendar, RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";

interface DailyQuestion {
  id: number;
  level: "आसान" | "मध्यम" | "कठिन (पहेली)";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const dailyQuestions: DailyQuestion[] = [
  {
    id: 1,
    level: "आसान",
    question: "यदि एक पेंसिल का मूल्य ₹5 है, तो 12 पेंसिलों का कुल मूल्य कितना होगा?",
    options: ["₹50", "₹55", "₹60", "₹65"],
    answer: 2,
    explanation: "एकात्मक विधि: 12 × 5 = ₹60",
  },
  {
    id: 2,
    level: "मध्यम",
    question: "एक आयताकार कमरे की लंबाई 10 मीटर और चौड़ाई 6 मीटर है। इसका परिमाप क्या होगा?",
    options: ["16 मीटर", "32 मीटर", "60 वर्ग मीटर", "26 मीटर"],
    answer: 1,
    explanation: "परिमाप = 2(लंबाई + चौड़ाई) = 2(10 + 6) = 2(16) = 32 मीटर",
  },
  {
    id: 3,
    level: "कठिन (पहेली)",
    question: "पहेली: मैं एक विषम संख्या हूँ। मुझमें से एक अक्षर निकाल दो तो मैं 'EVEN' बन जाती हूँ! मैं कौन सी संख्या हूँ?",
    options: ["ONE", "SEVEN", "NINE", "ELEVEN"],
    answer: 1,
    explanation: "शब्द 'SEVEN' में से पहला अक्षर 'S' हटाने पर 'EVEN' बचता है!",
  },
];

export const DailyChallengePage: React.FC = () => {
  const { points, streak, addPoints, updateStreak } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const todayStr = new Date().toLocaleDateString("hi-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheck = (q: DailyQuestion) => {
    if (selectedAnswers[q.id] === undefined) return;
    setSubmitted((prev) => ({ ...prev, [q.id]: true }));

    if (selectedAnswers[q.id] === q.answer) {
      addPoints(15);
      updateStreak();
    }
  };

  const totalAnswered = Object.keys(submitted).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Calendar size={16} />
          <span>{todayStr}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          आज का गणित चैलेंज 🎯
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          प्रतिदिन 3 नए सवाल हल करें, अपनी स्ट्रीक बनाएं और गणितीय मस्तिष्क को चुस्त रखें!
        </p>
      </div>

      {/* Streak & Score Bar */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Flame size={32} className="text-yellow-300 animate-pulse" />
          </div>
          <div>
            <span className="font-body text-xs text-green-100 uppercase tracking-wider block">
              आपकी दैनिक स्ट्रीक (Daily Streak)
            </span>
            <span className="font-heading text-2xl sm:text-3xl font-extrabold">
              {streak} दिन लगातार! 🔥
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="font-body text-xs text-green-100 uppercase tracking-wider block">
              कुल अर्जित अंक
            </span>
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-yellow-300">
              {points} pts
            </span>
          </div>
          <div className="p-3 bg-white/20 rounded-2xl">
            <Trophy size={32} className="text-yellow-300" />
          </div>
        </div>
      </div>

      {/* 3 Questions Container */}
      <div className="space-y-6">
        {dailyQuestions.map((q, idx) => {
          const isAnswered = submitted[q.id];
          const chosen = selectedAnswers[q.id];
          const isCorrect = chosen === q.answer;

          const badgeColors = {
            "आसान": "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300",
            "मध्यम": "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
            "कठिन (पहेली)": "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
          }[q.level];

          return (
            <div
              key={q.id}
              className="bg-card border-2 border-border rounded-3xl p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${badgeColors}`}>
                  {q.level}
                </span>
                <span className="font-heading text-xs text-muted-foreground">
                  प्रश्न {idx + 1} / 3 (+15 pts)
                </span>
              </div>

              <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                {q.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  let optStyle = "bg-muted/50 hover:bg-muted text-foreground border-border";
                  if (isAnswered) {
                    if (optIdx === q.answer) {
                      optStyle = "bg-green-100 dark:bg-green-950/60 border-green-500 text-green-800 dark:text-green-200 font-bold";
                    } else if (chosen === optIdx) {
                      optStyle = "bg-red-100 dark:bg-red-950/60 border-red-500 text-red-800 dark:text-red-200";
                    } else {
                      optStyle = "opacity-50 bg-muted/30 border-transparent";
                    }
                  } else if (chosen === optIdx) {
                    optStyle = "bg-primary/10 border-primary text-primary font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`p-3.5 rounded-2xl border-2 text-left font-body text-sm transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && optIdx === q.answer && (
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                      )}
                      {isAnswered && chosen === optIdx && !isCorrect && (
                        <XCircle size={16} className="text-red-600 dark:text-red-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Status Button */}
              {!isAnswered ? (
                <button
                  onClick={() => handleCheck(q)}
                  disabled={chosen === undefined}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-heading text-sm py-2.5 rounded-2xl font-bold shadow transition"
                >
                  उत्तर जांचें
                </button>
              ) : (
                <div
                  className={`p-4 rounded-2xl text-xs font-body leading-relaxed ${
                    isCorrect
                      ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                  }`}
                >
                  <p className="font-heading font-bold mb-1">
                    {isCorrect ? "🎉 सही उत्तर! +15 अंक मिले!" : "❌ गलत उत्तर!"}
                  </p>
                  <p>
                    <strong>हल व व्याख्या:</strong> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalAnswered === 3 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-950/30 dark:to-amber-950/30 border-2 border-yellow-300 dark:border-yellow-700/50 rounded-3xl text-center space-y-2">
          <div className="text-4xl">🌟</div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            आज का चैलेंज पूरा हुआ!
          </h3>
          <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            कल फिर आइए और नए सवालों के साथ अपनी स्ट्रीक जारी रखिए!
          </p>
        </div>
      )}
    </div>
  );
};
