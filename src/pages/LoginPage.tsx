import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("कक्षा 6");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    login({
      name: name.trim(),
      grade,
      email: "",
      points: 100,
      streak: 1,
    });
    navigate("/progress");
  };

  const handleGuestLogin = () => {
    login({
      name: "अतिथि विद्यार्थी",
      grade: "कक्षा 5",
      email: "",
      points: 50,
      streak: 1,
    });
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-card border rounded-3xl p-6 shadow-xl space-y-5 text-center">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-4 shadow-xl">
            <User size={36} />
          </div>
        </div>

        <div>
          <h1 className="font-heading text-2xl text-foreground">विद्यार्थी प्रवेश (Login)</h1>
          <p className="font-body text-xs text-muted-foreground mt-1">
            अपनी प्रगति और स्कोर सुरक्षित रखने के लिए प्रोफाइल बनाएं
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5 text-left">
          <div>
            <label className="font-body text-xs font-bold text-foreground block mb-1">
              आपका नाम (Student Name)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. राहुल शर्मा"
              className="w-full px-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="font-body text-xs font-bold text-foreground block mb-1">
              आपकी कक्षा (Class)
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                <option key={c} value={`कक्षा ${c}`}>
                  कक्षा {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-heading text-base flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all min-h-0"
          >
            <LogIn size={16} /> प्रोफाइल शुरू करें
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-3 text-xs text-muted-foreground font-body">अथवा</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full py-2.5 rounded-2xl border bg-muted/30 font-body font-bold text-xs text-foreground hover:bg-muted transition"
        >
          अतिथि (Guest) रूप में जारी रखें
        </button>
      </div>
    </div>
  );
};
