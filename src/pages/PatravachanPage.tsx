import React, { useState } from "react";
import { Mic, BookOpen, Volume2, Clock, Sparkles, X, CheckCircle2, AlertCircle } from "lucide-react";
import { patravachanTopicsList, patravachanDetailsData } from "../data/patravachanData";
import { PatravachanTopic, PatravachanDetail } from "../types";

export const PatravachanPage: React.FC = () => {
  const [selectedTopicNo, setSelectedTopicNo] = useState<number>(1);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState(false);

  const activeTopic =
    patravachanTopicsList.find((t) => t.no === selectedTopicNo) || patravachanTopicsList[0];

  const activeDetail: PatravachanDetail | undefined =
    patravachanDetailsData[selectedTopicNo];

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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <Mic size={16} />
          <span>स्कूल असेंबली, भाषण व नाटक स्क्रिप्ट</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित पत्रवाचन एवं भाषण मंच 🎙️
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          प्रार्थना सभा में भाषण, कविता पाठ, गणित दिवस उत्सव और लघु नाटिकाओं की संपूर्ण तैयार स्क्रिप्ट्स।
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topics List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground px-2">
            विषय सूची ({patravachanTopicsList.length})
          </h3>
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {patravachanTopicsList.map((topic) => {
              const isSelected = selectedTopicNo === topic.no;
              return (
                <button
                  key={topic.no}
                  onClick={() => {
                    setSelectedTopicNo(topic.no);
                    if (speaking) {
                      window.speechSynthesis.cancel();
                      setSpeaking(false);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-md font-bold"
                      : "bg-card border-border hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                      {topic.type}
                    </span>
                    <span className="text-[10px] font-body text-muted-foreground">
                      {topic.level}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm text-foreground">
                    {topic.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Topic Viewer */}
        <div className="lg:col-span-8">
          <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header */}
            <div className="border-b border-border pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400">
                    {activeTopic.type}
                  </span>
                  <span className="text-xs font-body text-muted-foreground">• {activeTopic.level}</span>
                  <span className="text-xs font-body text-muted-foreground">• {activeTopic.duration}</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {activeTopic.title}
                </h2>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSpeech(activeTopic.intro + "। " + activeTopic.points.join(" "))}
                  className={`p-2.5 rounded-xl border text-xs font-heading font-bold flex items-center gap-1.5 transition ${
                    speaking
                      ? "bg-amber-500 text-white border-amber-500 animate-pulse"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Volume2 size={16} />
                  <span>{speaking ? "रोकें" : "सुनें"}</span>
                </button>

                {activeDetail && (
                  <button
                    onClick={() => setShowDetailModal(true)}
                    className="p-2.5 rounded-xl bg-amber-500 text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow hover:bg-amber-600 transition"
                  >
                    <BookOpen size={16} />
                    <span>पूर्ण स्क्रिप्ट देखें</span>
                  </button>
                )}
              </div>
            </div>

            {/* Intro */}
            <div className="p-4 rounded-2xl bg-muted/40 border text-xs sm:text-sm font-body text-foreground/90 leading-relaxed">
              {activeTopic.intro}
            </div>

            {/* Speaking Points */}
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <Mic size={16} className="text-amber-500" />
                <span>मुख्य भाषण बिंदु (Key Speech Points)</span>
              </h3>
              <div className="space-y-2">
                {activeTopic.points.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs font-body flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-heading text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90 leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Lines */}
            {activeTopic.sampleLines && (
              <div className="p-4 rounded-2xl bg-amber-100/50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs font-body">
                <strong className="font-heading text-amber-900 dark:text-amber-200 block mb-1">
                  🌟 प्रभावशाली आरंभिक पंक्तियाँ:
                </strong>
                <p className="italic text-amber-950 dark:text-amber-100">
                  "{activeTopic.sampleLines}"
                </p>
              </div>
            )}

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
              <div className="p-3.5 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <strong className="font-heading text-green-900 dark:text-green-200 block mb-1">
                  ✅ मुख्य बिंदु:
                </strong>
                <ul className="space-y-1 text-green-950 dark:text-green-100">
                  {activeTopic.keyPoints.map((kp, idx) => (
                    <li key={idx}>• {kp}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <strong className="font-heading text-red-900 dark:text-red-200 block mb-1">
                  ❌ मंच पर क्या न करें:
                </strong>
                <ul className="space-y-1 text-red-950 dark:text-red-100">
                  {activeTopic.doNot.map((dn, idx) => (
                    <li key={idx}>• {dn}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCRIPT MODAL */}
      {showDetailModal && activeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-card border-2 border-border text-foreground w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 relative">
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
              >
                <X size={20} />
              </button>
              <span className="text-xs font-heading font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
                {activeDetail.type} • {activeDetail.duration}
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mt-2">
                {activeDetail.title}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Full Script */}
              <div>
                <h4 className="font-heading text-base font-bold text-foreground mb-2">
                  📜 पूर्ण भाषण / कविता पाठ
                </h4>
                <div className="p-5 rounded-2xl bg-muted/40 border">
                  <pre className="font-body text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {activeDetail.fullScript}
                  </pre>
                </div>
              </div>

              {/* Stage Tips */}
              {activeDetail.stageTips && (
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-2">
                    💡 मंच प्रस्तुति टिप्स (Stage Tips):
                  </h4>
                  <ul className="space-y-1 text-xs font-body text-foreground/80 list-disc list-inside">
                    {activeDetail.stageTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="bg-primary text-primary-foreground font-heading text-sm px-6 py-2 rounded-full font-bold shadow"
                >
                  बंद करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
