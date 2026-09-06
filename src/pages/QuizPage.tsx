import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Trophy,
  CircleHelp,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award
} from "lucide-react";
import { quizQuestionsByClass } from "../data/quizQuestions";
import { useApp } from "../context/AppContext";
import { saveLeaderboardEntry, LeaderboardModal } from "../components/LeaderboardModal";

export const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialClass = parseInt(searchParams.get("class") || "5", 10);

  const [selectedClass, setSelectedClass] = useState<number>(initialClass);
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState("मेधावी छात्र");

  const { addPoints } = useApp();

  const questions = quizQuestionsByClass[selectedClass] || quizQuestionsByClass[5];

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (quizStarted && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && quizStarted && !quizFinished) {
      // Auto move to next question if time runs out
      handleAnswer(-1);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, timeLeft, currentIdx]);

  const startQuiz = () => {
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers([]);
    setTimeLeft(20);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === questions[currentIdx].answer;
    const newAnswers = [...userAnswers, optionIdx];
    setUserAnswers(newAnswers);

    const pointMultiplier = difficulty === "expert" ? 30 : difficulty === "intermediate" ? 20 : 10;

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
      addPoints(pointMultiplier);
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setTimeLeft(20);
    } else {
      setQuizFinished(true);
      saveLeaderboardEntry(
        playerName,
        newScore,
        questions.length,
        difficulty,
        `कक्षा ${selectedClass} क्विज़`
      );
    }
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <CircleHelp size={16} />
          <span>ऑनलाइन लाइव परीक्षा</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित क्विज़ प्रतियोगिता 🏆
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          कक्षा 1 से 9 तक के बहुविकल्पीय प्रश्न हल करें, तुरंत अंक पाएं और लीडरबोर्ड पर छाएं!
        </p>
      </div>

      {/* Main Container */}
      {!quizStarted ? (
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Class Select */}
          <div>
            <label className="block font-heading text-sm font-bold text-foreground mb-2">
              अपनी कक्षा चुनें:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  className={`py-3 rounded-2xl font-heading text-sm font-bold border-2 transition ${
                    selectedClass === c
                      ? "bg-red-500 text-white border-red-500 shadow-md scale-105"
                      : "bg-muted/40 border-border text-foreground hover:bg-muted"
                  }`}
                >
                  कक्षा {c}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Select */}
          <div>
            <label className="block font-heading text-sm font-bold text-foreground mb-2">
              कठिनाई स्तर (Difficulty Level):
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "beginner", label: "शुरुआती (10 pts)", desc: "आसान प्रश्न", color: "text-green-600" },
                { id: "intermediate", label: "मध्यम (20 pts)", desc: "मानक स्तर", color: "text-blue-600" },
                { id: "expert", label: "विशेषज्ञ (30 pts)", desc: "कठिन प्रश्न", color: "text-red-600" },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setDifficulty(lvl.id as any)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition ${
                    difficulty === lvl.id
                      ? "bg-red-50 dark:bg-red-950/30 border-red-500 shadow-sm"
                      : "bg-background border-border hover:bg-muted/40"
                  }`}
                >
                  <p className="font-heading text-sm font-bold text-foreground">{lvl.label}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Player Name */}
          <div>
            <label className="block font-heading text-sm font-bold text-foreground mb-2">
              आपका नाम (लीडरबोर्ड के लिए):
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="अपना नाम दर्ज करें..."
              className="w-full sm:w-80 px-4 py-2.5 rounded-2xl border-2 border-border bg-background text-sm font-body focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
            <button
              onClick={startQuiz}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-heading text-base py-3 rounded-2xl font-bold shadow-lg transition flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>क्विज़ शुरू करें ({questions.length} सवाल)</span>
            </button>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="px-5 py-3 rounded-2xl border-2 border-border bg-muted/30 font-heading text-sm font-bold text-foreground hover:bg-muted transition flex items-center gap-2"
            >
              <Trophy size={16} className="text-yellow-500" />
              <span>लीडरबोर्ड</span>
            </button>
          </div>
        </div>
      ) : !quizFinished ? (
        /* QUIZ IN PROGRESS */
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress & Timer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="font-heading text-sm font-bold text-muted-foreground">
              प्रश्न {currentIdx + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-mono text-sm font-bold">
              <Timer size={16} />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-4 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground leading-snug">
              {currentQ.q}
            </h2>
            {currentQ.hint && (
              <p className="text-xs font-body text-muted-foreground mt-2">
                💡 संकेत: {currentQ.hint}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="p-4 rounded-2xl border-2 border-border/80 bg-background hover:border-red-500 hover:bg-red-50/40 dark:hover:bg-red-950/20 font-heading text-lg font-bold text-foreground text-left transition flex items-center justify-between group"
              >
                <span>{opt}</span>
                <span className="w-6 h-6 rounded-full border border-muted-foreground/30 flex items-center justify-center text-xs group-hover:border-red-500 group-hover:text-red-500">
                  {String.fromCharCode(65 + i)}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* QUIZ FINISHED RESULTS */
        <div className="bg-card border-2 border-border rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="text-6xl animate-bounce">
            {score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "⭐" : "👍"}
          </div>

          <div>
            <h2 className="font-heading text-3xl font-extrabold text-foreground">
              क्विज़ संपन्न!
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              शानदार प्रदर्शन, {playerName}!
            </p>
          </div>

          <div className="p-6 bg-muted/40 rounded-3xl border-2 max-w-sm mx-auto space-y-2">
            <p className="font-heading text-sm text-muted-foreground uppercase">आपका कुल स्कोर</p>
            <p className="font-heading text-5xl font-black text-red-500">
              {score} / {questions.length}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              प्रतिशत: {Math.round((score / questions.length) * 100)}%
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={startQuiz}
              className="bg-red-500 hover:bg-red-600 text-white font-heading text-sm px-6 py-2.5 rounded-full font-bold shadow flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>फिर से खेलें</span>
            </button>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-heading text-sm px-6 py-2.5 rounded-full font-bold shadow flex items-center gap-2"
            >
              <Trophy size={16} />
              <span>लीडरबोर्ड देखें</span>
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="border-2 border-border bg-background hover:bg-muted font-heading text-sm px-6 py-2.5 rounded-full font-bold text-foreground"
            >
              कक्षा बदलें
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg">
            <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
