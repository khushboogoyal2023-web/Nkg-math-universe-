import React, { useState } from "react";
import {
  Trophy,
  Award,
  TrendingUp,
  Star,
  RotateCcw,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";

interface Badge {
  id: string;
  label: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export const ProgressPage: React.FC = () => {
  const { points, streak, addPoints, resetProgress } = useApp();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const level =
    points < 100 ? "Beginner" : points < 500 ? "Intermediate" : "Expert";
  const levelEmoji = level === "Expert" ? "🏆" : level === "Intermediate" ? "⭐" : "🌱";
  const nextTarget = level === "Beginner" ? 100 : level === "Intermediate" ? 500 : 1000;
  const progressPercent = Math.min(100, Math.round((points / nextTarget) * 100));

  const badges: Badge[] = [
    { id: "first_quiz", label: "पहला कदम", desc: "1 क्विज़ पूरा करें", icon: "🎯", unlocked: points >= 10 },
    { id: "streak_3", label: "3 दिन स्ट्रीक", desc: "3 दिन लगातार अभ्यास", icon: "🔥", unlocked: streak >= 3 },
    { id: "century", label: "शतकवीर", desc: "100 अंक अर्जित करें", icon: "💯", unlocked: points >= 100 },
    { id: "math_pro", label: "गणित प्रो", desc: "250 अंक अर्जित करें", icon: "🏅", unlocked: points >= 250 },
    { id: "streak_7", label: "सप्ताह विजेता", desc: "7 दिन लगातार स्ट्रीक", icon: "⚡", unlocked: streak >= 7 },
    { id: "math_wizard", label: "मैथ विज़ार्ड", desc: "500+ अंक", icon: "🧙", unlocked: points >= 500 },
  ];

  const subjectProgress = [
    { id: "vedic", label: "वैदिक गणित", icon: "🕉️", completed: 8, total: 16, color: "from-purple-500 to-indigo-600" },
    { id: "quiz", label: "क्विज़ प्रतियोगिता", icon: "🧠", completed: 4, total: 9, color: "from-blue-500 to-cyan-600" },
    { id: "models", label: "गणित मॉडल", icon: "🔬", completed: 12, total: 100, color: "from-orange-500 to-amber-500" },
    { id: "lab", label: "वर्चुअल लैब", icon: "🧪", completed: 6, total: 20, color: "from-teal-500 to-green-600" },
    { id: "glossary", label: "गणित शब्दकोश", icon: "📚", completed: 35, total: 65, color: "from-rose-500 to-pink-600" },
    { id: "games", label: "गणित खेल", icon: "🎮", completed: 10, total: 20, color: "from-amber-500 to-yellow-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          📊 मेरी प्रगति (My Progress)
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          आपकी सीखने की यात्रा और उपलब्धियों का संपूर्ण विवरण!
        </p>
      </div>

      {/* Hero Summary Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl shadow-inner">
                {levelEmoji}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow">
                {streak}🔥
              </div>
            </div>
            <div>
              <p className="font-body text-xs opacity-80 uppercase tracking-wider font-bold">
                स्तर (Level)
              </p>
              <h2 className="font-heading text-3xl">{level}</h2>
              <div className="flex gap-4 mt-2 font-body text-xs">
                <div>
                  <span className="opacity-70 block">पॉइंट्स</span>
                  <span className="font-heading text-lg font-bold text-yellow-300">
                    {points} ⭐
                  </span>
                </div>
                <div>
                  <span className="opacity-70 block">स्ट्रीक</span>
                  <span className="font-heading text-lg font-bold text-orange-300">
                    {streak} दिन 🔥
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-white/30 bg-white/10 font-heading text-2xl font-bold">
              {progressPercent}%
            </div>
            <p className="font-body text-[11px] opacity-75 mt-1">अगले स्तर तक</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs opacity-80 mb-1 font-body">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Expert</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subject-wise Progress */}
      <div className="bg-card border rounded-2xl p-5 shadow-sm">
        <h2 className="font-heading text-lg mb-4 flex items-center gap-2 text-foreground">
          <TrendingUp size={20} className="text-primary" /> विषयवार प्रगति
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {subjectProgress.map((item) => {
            const pct = Math.round((item.completed / item.total) * 100);
            return (
              <div key={item.id} className="bg-muted/40 rounded-xl p-3 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <p className="font-body text-xs font-bold truncate text-foreground">
                    {item.label}
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="font-body text-[11px] text-muted-foreground">
                  {item.completed}/{item.total} • {pct}%
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-card border rounded-2xl p-5 shadow-sm">
        <h2 className="font-heading text-lg mb-4 flex items-center gap-2 text-foreground">
          <Award size={20} className="text-primary" /> पदक व बैज (Badges)
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                b.unlocked
                  ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-sm"
                  : "border-border bg-muted/20 opacity-50"
              }`}
            >
              <span className="text-3xl mb-1">{b.icon}</span>
              <p className="font-body text-xs font-bold text-center leading-tight">
                {b.label}
              </p>
              <p className="font-body text-[10px] text-muted-foreground text-center mt-0.5">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => addPoints(20)}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-2xl font-body font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-md min-h-0"
        >
          <Zap size={16} /> +20 Points जोड़ें
        </button>
        <button
          onClick={resetProgress}
          className="flex items-center gap-1.5 bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-3 rounded-2xl font-body text-xs min-h-0 transition-all"
        >
          <RotateCcw size={14} /> रीसेट करें
        </button>
      </div>
    </div>
  );
};
