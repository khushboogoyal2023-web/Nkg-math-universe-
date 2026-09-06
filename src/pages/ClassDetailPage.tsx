import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Volume2
} from "lucide-react";
import { classesData } from "../data/classesData";

const classColors: Record<number, string> = {
  1: "from-pink-500 to-rose-600",
  2: "from-orange-400 to-amber-500",
  3: "from-yellow-400 to-orange-500",
  4: "from-green-500 to-emerald-600",
  5: "from-teal-500 to-cyan-600",
  6: "from-blue-500 to-indigo-600",
  7: "from-indigo-500 to-purple-600",
  8: "from-purple-500 to-pink-600",
  9: "from-rose-500 to-red-600",
};

export const ClassDetailPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const classNum = parseInt(classId || "1", 10);
  const classItem = classesData[classNum] || classesData[1];
  const color = classColors[classNum] || "from-primary to-indigo-600";

  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const currentTopic = classItem.topics[selectedTopicIdx] || classItem.topics[0];

  const handleSpeech = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        to="/classes"
        className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-muted-foreground hover:text-foreground mb-4 transition"
      >
        <ArrowLeft size={16} />
        <span>सभी कक्षाएं देखें</span>
      </Link>

      {/* Top Banner */}
      <div className={`bg-gradient-to-r ${color} rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{classItem.emoji}</span>
            <div>
              <span className="bg-white/20 text-white font-heading text-xs px-3 py-0.5 rounded-full uppercase">
                कक्षा {classNum} गणित
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mt-1">
                {classItem.name}
              </h1>
              <p className="font-body text-xs sm:text-sm text-white/90 mt-1">
                कुल {classItem.topics.length} मुख्य अवधारणाएं और अध्याय
              </p>
            </div>
          </div>

          <Link
            to={`/quiz?class=${classNum}`}
            className="bg-white text-slate-900 hover:bg-white/90 font-heading text-xs sm:text-sm px-5 py-2.5 rounded-2xl font-bold shadow-md transition flex items-center gap-2"
          >
            <Trophy size={16} className="text-yellow-500" />
            <span>कक्षा {classNum} क्विज़ खेलें</span>
          </Link>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground px-2">
            अध्याय सूची
          </h3>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {classItem.topics.map((topic, idx) => {
              const isSelected = selectedTopicIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTopicIdx(idx);
                    if (speaking) {
                      window.speechSynthesis.cancel();
                      setSpeaking(false);
                    }
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl font-heading text-xs sm:text-sm transition-all flex items-center justify-between border ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md font-bold"
                      : "bg-card text-foreground hover:bg-muted border-border"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? "bg-white text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate">{topic.title}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-80 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Topic Content View */}
        <div className="lg:col-span-8">
          <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Topic Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="text-xs font-heading font-bold text-primary">
                  अध्याय {selectedTopicIdx + 1}
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground mt-0.5">
                  {currentTopic.title}
                </h2>
              </div>

              <button
                onClick={() => handleSpeech(currentTopic.content)}
                className={`p-2.5 rounded-xl border text-xs font-heading font-bold flex items-center gap-1.5 transition ${
                  speaking
                    ? "bg-primary text-primary-foreground border-primary animate-pulse"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Volume2 size={16} />
                <span>{speaking ? "रोकें" : "बोलकर सुनाओ"}</span>
              </button>
            </div>

            {/* Topic Body Content */}
            <div className="p-6 bg-muted/20 border border-border rounded-2xl">
              <pre className="font-body text-sm sm:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                {currentTopic.content}
              </pre>
            </div>

            {/* Quick Practice Bar */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-body text-foreground">
                <span className="font-heading font-bold text-primary block">
                  क्या आपने यह अध्याय समझ लिया?
                </span>
                <span>अब इस विषय पर आधारित प्रश्नों का अभ्यास करें।</span>
              </div>
              <Link
                to={`/quiz?class=${classNum}`}
                className="bg-primary text-primary-foreground font-heading text-xs px-4 py-2 rounded-xl font-bold shadow hover:opacity-90 transition flex items-center gap-1.5"
              >
                <span>क्विज़ टेस्ट दें</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
