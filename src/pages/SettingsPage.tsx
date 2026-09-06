import React, { useState } from "react";
import {
  Settings,
  Globe,
  Type,
  Moon,
  Sun,
  Bell,
  Trash2,
  AlertTriangle,
  User,
  Volume2,
  VolumeX,
  Check,
  LogIn,
  LogOut,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const SettingsPage: React.FC = () => {
  const {
    lang,
    setLang,
    fontSize,
    setFontSize,
    isDark,
    toggleDark,
    musicOn,
    setMusicOn,
    musicVolume,
    setMusicVolume,
    dailyAlert,
    setDailyAlert,
    quizAlert,
    setQuizAlert,
    user,
    logout,
  } = useApp();

  const [cacheMsg, setCacheMsg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const clearCache = () => {
    const keepKeys = [
      "nkg_user_profile",
      "nkg_lang",
      "nkg_music_on",
      "nkg_music_volume",
      "nkg_font_size",
      "nkg_daily_alert",
      "nkg_quiz_alert",
    ];
    Object.keys(localStorage).forEach((key) => {
      if (!keepKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    setCacheMsg(
      lang === "hi"
        ? "✅ Cache साफ़ हो गया! Space free हुई।"
        : "✅ Cache cleared! Space freed up."
    );
    setTimeout(() => setCacheMsg(""), 3000);
  };

  const deleteAccount = () => {
    logout();
    localStorage.removeItem("nkg_user_profile");
    localStorage.removeItem("dc_points");
    localStorage.removeItem("dc_streak");
    localStorage.removeItem("nkg_leaderboard");
    setShowDeleteModal(false);
  };

  const fontOptions = [
    { id: "small" as const, label: "S", desc: "Small", hi: "छोटा" },
    { id: "medium" as const, label: "M", desc: "Medium", hi: "मध्यम" },
    { id: "large" as const, label: "L", desc: "Large", hi: "बड़ा" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-slate-600 to-gray-800 text-white rounded-3xl p-4 shadow-xl">
            <Settings size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl mb-1">
          ⚙️ {lang === "hi" ? "सेटिंग्स" : "Settings"}
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          {lang === "hi" ? "अपनी पसंद के अनुसार ऐप सेट करें" : "Customize your app preferences"}
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-heading">
            {user?.name ? user.name[0].toUpperCase() : "👤"}
          </div>
          <div className="flex-1">
            {user ? (
              <>
                <p className="font-heading text-base">{user.name}</p>
                <p className="font-body text-xs text-muted-foreground">
                  {user.email || user.grade || "विद्यार्थी"}
                </p>
              </>
            ) : (
              <>
                <p className="font-heading text-base">
                  {lang === "hi" ? "अतिथि विद्यार्थी" : "Guest Student"}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {lang === "hi" ? "प्रगति स्थानीय रूप से सुरक्षित है" : "Progress saved locally"}
                </p>
              </>
            )}
          </div>
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-700 px-3 py-2 rounded-xl font-body text-xs font-bold min-h-0 hover:bg-red-100 transition"
            >
              <LogOut size={14} /> Logout
            </button>
          ) : null}
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} className="text-primary" />
          <h2 className="font-heading text-lg">
            {lang === "hi" ? "ऐप की भाषा" : "App Language"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { code: "hi" as const, label: "हिंदी", sublabel: "सरल और शुद्ध हिंदी", flag: "🇮🇳" },
            { code: "en" as const, label: "English", sublabel: "Technical English", flag: "🇬🇧" },
          ].map((item) => (
            <button
              key={item.code}
              onClick={() => setLang(item.code)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                lang === item.code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              {lang === item.code && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                  <Check size={12} />
                </div>
              )}
              <div className="text-3xl mb-2">{item.flag}</div>
              <p className="font-heading text-base">{item.label}</p>
              <p className="font-body text-xs text-muted-foreground">{item.sublabel}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Section */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Type size={20} className="text-primary" />
          <h2 className="font-heading text-lg">
            {lang === "hi" ? "अक्षर का आकार (Text Size)" : "Text Size"}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {fontOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFontSize(opt.id)}
              className={`py-3 rounded-2xl border-2 text-center transition-all ${
                fontSize === opt.id
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <span
                className={`font-heading block ${
                  opt.id === "small" ? "text-base" : opt.id === "medium" ? "text-xl" : "text-3xl"
                }`}
              >
                {opt.label}
              </span>
              <span className="font-body text-xs text-muted-foreground">
                {lang === "hi" ? opt.hi : opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Music Section */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 size={20} className="text-primary" />
          <h2 className="font-heading text-lg">
            {lang === "hi" ? "बैकग्राउंड संगीत" : "Background Music"}
          </h2>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-heading text-base">
              {lang === "hi" ? "संगीत चालू / बंद" : "Music ON / OFF"}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              {lang === "hi" ? "पढ़ाई के दौरान हल्का संगीत" : "Relaxing audio while studying"}
            </p>
          </div>
          <button
            onClick={() => setMusicOn(!musicOn)}
            className={`w-14 h-7 rounded-full transition-all relative ${
              musicOn ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
                musicOn ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <VolumeX size={16} className="text-muted-foreground shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={musicVolume}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 rounded-full accent-primary cursor-pointer"
          />
          <Volume2 size={16} className="text-muted-foreground shrink-0" />
          <span className="font-body text-xs w-8 text-right font-bold">
            {Math.round(musicVolume * 100)}%
          </span>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDark ? (
              <Moon size={20} className="text-primary" />
            ) : (
              <Sun size={20} className="text-amber-500" />
            )}
            <div>
              <h2 className="font-heading text-base">
                {lang === "hi" ? "डार्क मोड" : "Dark Mode"}
              </h2>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "hi" ? "आँखों के लिए आरामदायक" : "Gentle on the eyes"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDark}
            className={`w-12 h-6 rounded-full transition-all relative ${
              isDark ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                isDark ? "left-6" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={20} className="text-primary" />
          <h2 className="font-heading text-lg">
            {lang === "hi" ? "अलर्ट और सूचनाएं" : "Alerts & Notifications"}
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm">
                {lang === "hi" ? "🎯 डेली चैलेंज अलर्ट" : "🎯 Daily Challenge Alert"}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "hi" ? "हर दिन नया सवाल याद दिलाएं" : "Remind of daily questions"}
              </p>
            </div>
            <button
              onClick={() => setDailyAlert(!dailyAlert)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                dailyAlert ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                  dailyAlert ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm">
                {lang === "hi" ? "🧠 क्विज़ अलर्ट" : "🧠 Quiz Alert"}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                {lang === "hi" ? "नई क्विज़ प्रतियोगिता की सूचना" : "Notify of new contests"}
              </p>
            </div>
            <button
              onClick={() => setQuizAlert(!quizAlert)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                quizAlert ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                  quizAlert ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Clear Cache */}
      <div className="bg-card border rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 size={20} className="text-orange-500" />
          <h2 className="font-heading text-lg">
            {lang === "hi" ? "Cache साफ़ करें" : "Clear Cache"}
          </h2>
        </div>
        <p className="font-body text-xs text-muted-foreground mb-3">
          {lang === "hi"
            ? "अस्थायी डेटा हटाएं — आपकी प्रगति व सेटिंग्स सुरक्षित रहेंगी।"
            : "Remove temporary data — your scores and settings remain safe."}
        </p>
        {cacheMsg ? (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl px-3 py-2 text-xs font-body mb-3">
            {cacheMsg}
          </div>
        ) : null}
        <button
          onClick={clearCache}
          className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400 px-5 py-2.5 rounded-2xl font-heading text-sm hover:bg-orange-100 transition"
        >
          <Trash2 size={16} /> {lang === "hi" ? "Cache Clean करो" : "Clean Cache Now"}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={20} className="text-red-500" />
          <h2 className="font-heading text-lg text-red-600 dark:text-red-400">
            {lang === "hi" ? "खतरनाक क्षेत्र (Danger Zone)" : "Danger Zone"}
          </h2>
        </div>
        <p className="font-body text-xs text-muted-foreground mb-3">
          {lang === "hi"
            ? "अपना अकाउंट व सभी रिकॉर्ड्स हटाएं — यह प्रक्रिया वापस नहीं हो सकती।"
            : "Delete your local profile and all progress — this cannot be undone."}
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-2xl font-heading text-sm hover:bg-red-600 transition"
        >
          <Trash2 size={16} /> {lang === "hi" ? "अकाउंट डिलीट करें" : "Delete Account"}
        </button>
      </div>

      {/* Version Footer */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-5 text-center shadow-md">
        <div className="text-3xl mb-2">🔢</div>
        <h2 className="font-heading text-lg">NKG MATH UNIVERSE</h2>
        <p className="font-body text-sm opacity-80">© 2026 | Version 2.0</p>
        <p className="font-body text-xs opacity-70 mt-1">
          {lang === "hi" ? "कक्षा 1-9 | गणित सीखो, मज़े करो!" : "Class 1-9 | Learn Math, Have Fun!"}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-6 w-full max-w-sm shadow-2xl border text-center">
            <h3 className="font-heading text-xl text-destructive mb-2">
              ⚠️ {lang === "hi" ? "अकाउंट डिलीट करें?" : "Delete Account?"}
            </h3>
            <p className="font-body text-xs text-muted-foreground mb-5 leading-relaxed">
              {lang === "hi"
                ? "क्या आप सच में अपनी सारी प्रगति और डेटा हटाना चाहते हैं?"
                : "Are you sure you want to reset and delete all local profile data?"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-2xl border font-body font-bold text-sm hover:bg-muted"
              >
                {lang === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={deleteAccount}
                className="flex-1 py-2.5 rounded-2xl bg-destructive text-destructive-foreground font-body font-bold text-sm hover:opacity-90"
              >
                {lang === "hi" ? "हाँ, डिलीट करें" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
