import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  Trash2,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { useApp } from "../context/AppContext";

interface Message {
  role: "user" | "model";
  text: string;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "नमस्ते! 🙏 मैं आपका गणित मित्र (Math Mitra) हूँ। कक्षा 1 से 9 तक के किसी भी गणितीय विषय, प्रमेय, सूत्र या पहेली के बारे में मुझसे पूछिए!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { addPoints } = useApp();

  const suggestions = [
    "पाइथागोरस प्रमेय को एक रोचक कहानी के रूप में समझाओ।",
    "भिन्न (Fractions) क्या हैं? पिज़्ज़ा के उदाहरण से सिखाओ।",
    "दैनिक जीवन में बीजगणित (Algebra) का क्या उपयोग है?",
    "शून्य (Zero) की खोज किसने की और इसका क्या महत्व है?",
    "संख्या 1729 को रामानुजन संख्या क्यों कहते हैं?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6), // Send last 6 messages as context
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "AI उत्तर प्राप्त करने में त्रुटि हुई।");
      }

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      addPoints(5);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "क्षमा करें, उत्तर प्राप्त करने में कुछ कठिनाई हुई। कृपया इंटरनेट जांचकर पुनः पूछें।",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text: string, idx: number) => {
    if (!("speechSynthesis" in window)) return;
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    } else {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "hi-IN";
      u.rate = 0.95;
      u.onstart = () => setSpeakingIdx(idx);
      u.onend = () => setSpeakingIdx(null);
      u.onerror = () => setSpeakingIdx(null);
      window.speechSynthesis.speak(u);
    }
  };

  const clearChat = () => {
    if (window.confirm("क्या आप चैट साफ करना चाहते हैं?")) {
      setMessages([
        {
          role: "model",
          text: "नमस्ते! 🙏 मैं आपका गणित मित्र हूँ। आप मुझसे गणित का कोई भी सवाल पूछ सकते हैं!",
        },
      ]);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-80px)]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <span>गणित मित्र (AI Study Companion)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </h1>
            <p className="font-body text-xs text-muted-foreground">
              Gemini 2.5 Flash • कक्षा 1 से 9 तक का डिजिटल गुरु
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition text-xs font-body flex items-center gap-1"
          title="Clear Chat"
        >
          <Trash2 size={15} />
          <span className="hidden sm:inline">चैट मिटाएं</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((m, idx) => {
          const isModel = m.role === "model";
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                isModel ? "justify-start" : "justify-end"
              }`}
            >
              {isModel && (
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm space-y-2 ${
                  isModel
                    ? "bg-card border-2 border-border text-foreground"
                    : "bg-primary text-primary-foreground font-medium"
                }`}
              >
                <div className="font-body text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                  {m.text}
                </div>

                {isModel && (
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/60">
                    <button
                      onClick={() => handleSpeech(m.text, idx)}
                      className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1"
                      title="सुने"
                    >
                      <Volume2 size={13} />
                      <span className="text-[10px]">
                        {speakingIdx === idx ? "रोकें" : "सुनें"}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {!isModel && (
                <div className="w-8 h-8 rounded-xl bg-muted text-foreground flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-card border-2 border-border rounded-3xl p-4 shadow-sm flex items-center gap-2 text-muted-foreground text-xs font-heading">
              <Sparkles size={16} className="animate-spin text-primary" />
              <span>गणित मित्र सोच रहा है...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Strip */}
      <div className="pt-2 pb-2 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              disabled={loading}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border text-xs font-body text-foreground/80 transition flex-shrink-0"
            >
              💡 {s}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="flex-shrink-0 pt-2 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="गणित का कोई भी सवाल या संशय पूछें..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-border bg-background text-sm font-body text-foreground focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-3 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground transition shadow-md flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
