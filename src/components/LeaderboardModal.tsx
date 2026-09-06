import React from "react";
import { Trophy, Medal, X } from "lucide-react";
import { LeaderboardEntry } from "../types";

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    return JSON.parse(localStorage.getItem("nkg_leaderboard") || "[]");
  } catch {
    return [];
  }
}

export function saveLeaderboardEntry(
  name: string,
  score: number,
  total: number,
  level: "beginner" | "intermediate" | "expert",
  topic: string
) {
  const list = getLeaderboard();
  const pointMultiplier = level === "expert" ? 30 : level === "intermediate" ? 20 : 10;
  const points = score * pointMultiplier;

  list.push({
    name: name || "मेधावी छात्र",
    score,
    total,
    level,
    topic,
    points,
    date: new Date().toLocaleDateString("hi-IN"),
  });

  list.sort((a, b) => b.points - a.points);
  localStorage.setItem("nkg_leaderboard", JSON.stringify(list.slice(0, 25)));
}

interface LeaderboardModalProps {
  onClose?: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const entries = getLeaderboard();

  const rankBadges = [
    <Trophy key="1" size={20} className="text-yellow-500 inline" />,
    <Medal key="2" size={20} className="text-slate-400 inline" />,
    <Medal key="3" size={20} className="text-amber-700 inline" />,
  ];

  const levelBadges = {
    expert: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    beginner: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  };

  const levelLabels = {
    expert: "एक्सपर्ट",
    intermediate: "इंटरमीडिएट",
    beginner: "बिगिनर",
  };

  return (
    <div className="bg-card border rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={24} className="text-yellow-200" />
          <h2 className="font-heading text-xl">🏆 शीर्ष गणितीय लीडरबोर्ड</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-5xl mb-3">🎯</div>
          <p className="font-heading text-lg text-foreground mb-1">अभी कोई स्कोर दर्ज नहीं है!</p>
          <p className="font-body text-sm text-muted-foreground">
            क्विज़ या डेली चैलेंज हल करें और अपना नाम यहाँ चमकाएं!
          </p>
        </div>
      ) : (
        <div className="divide-y max-h-96 overflow-y-auto">
          {entries.slice(0, 15).map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3.5 ${
                idx < 3 ? "bg-amber-50/50 dark:bg-amber-950/20" : ""
              }`}
            >
              <div className="w-8 text-center font-heading text-base">
                {idx < 3 ? rankBadges[idx] : <span className="text-muted-foreground">{idx + 1}</span>}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm text-foreground truncate">
                  {item.name}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {item.topic} • {item.date}
                </p>
              </div>

              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-body font-bold ${
                  levelBadges[item.level] || "bg-muted text-muted-foreground"
                }`}
              >
                {levelLabels[item.level]}
              </span>

              <div className="text-right">
                <p className="font-heading text-base text-primary font-bold">{item.points} pts</p>
                <p className="font-body text-xs text-muted-foreground">
                  {item.score}/{item.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
