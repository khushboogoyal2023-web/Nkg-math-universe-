import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Language } from "../types";

export const translations = {
  hi: {
    appName: "NKG MATH UNIVERSE",
    appTagline: "गणित सीखो, मज़े करो!",
    home: "होम",
    classes: "कक्षाएं",
    tables: "पहाड़े",
    squaresCubes: "वर्ग और घन",
    formulas: "सूत्र",
    definitions: "परिभाषाएं",
    games: "खेल",
    quiz: "क्विज़",
    generalMath: "सामान्य ज्ञान",
    dailyChallenge: "डेली चैलेंज",
    workbook: "वर्कबुक",
    worksheets: "वर्कशीट",
    mathematicians: "महान गणितज्ञ",
    vedicMath: "वैदिक गणित",
    mathTricks: "गणित ट्रिक्स",
    mathModels: "गणित मॉडल",
    patravachan: "पत्रवाचन",
    aiSolver: "AI सॉल्वर",
    virtualLab: "वर्चुअल लैब",
    glossary: "शब्दकोश",
    interactiveModels: "3D मॉडल",
    models100: "100 मॉडल विचार",
    progress: "मेरी प्रगति",
    settings: "सेटिंग्स",
    aboutUs: "हमारे बारे में",
    privacyPolicy: "गोपनीयता नीति",
    contactUs: "संपर्क करें",
    helpSupport: "सहायता",
    studyCompanion: "गणित मित्र (AI)",
    startLearn: "सीखना शुरू करें",
    playGame: "खेल खेलें",
    goBack: "पीछे जाएं",
    downloadNotes: "नोट्स डाउनलोड",
    clear: "साफ़ करें",
    save: "सेव करें",
  },
  en: {
    appName: "NKG MATH UNIVERSE",
    appTagline: "Learn Math, Have Fun!",
    home: "Home",
    classes: "Classes",
    tables: "Tables",
    squaresCubes: "Squares & Cubes",
    formulas: "Formulas",
    definitions: "Definitions",
    games: "Games",
    quiz: "Quiz",
    generalMath: "General Math",
    dailyChallenge: "Daily Challenge",
    workbook: "Workbook",
    worksheets: "Worksheets",
    mathematicians: "Mathematicians",
    vedicMath: "Vedic Math",
    mathTricks: "Math Tricks",
    mathModels: "Math Models",
    patravachan: "Speeches & PPTs",
    aiSolver: "AI Solver",
    virtualLab: "Virtual Lab",
    glossary: "Glossary",
    interactiveModels: "3D Models",
    models100: "100 Model Ideas",
    progress: "My Progress",
    settings: "Settings",
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    contactUs: "Contact Us",
    helpSupport: "Help & Support",
    studyCompanion: "Math Companion (AI)",
    startLearn: "Start Learning",
    playGame: "Play Games",
    goBack: "Go Back",
    downloadNotes: "Download Notes",
    clear: "Clear",
    save: "Save",
  },
};

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.hi;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
  isDark: boolean;
  toggleDark: () => void;
  musicOn: boolean;
  setMusicOn: (val: boolean) => void;
  musicVolume: number;
  setMusicVolume: (val: number) => void;
  dailyAlert: boolean;
  setDailyAlert: (val: boolean) => void;
  quizAlert: boolean;
  setQuizAlert: (val: boolean) => void;
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  points: number;
  addPoints: (val: number) => void;
  streak: number;
  incrementStreak: () => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("nkg_lang") as Language) || "hi";
  });

  const [fontSize, setFontSizeState] = useState<"small" | "medium" | "large">(() => {
    return (localStorage.getItem("nkg_font_size") as "small" | "medium" | "large") || "medium";
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("nkg_theme") === "dark" || 
      (!localStorage.getItem("nkg_theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  const [musicOn, setMusicOnState] = useState<boolean>(() => {
    return localStorage.getItem("nkg_music_on") !== "0";
  });

  const [musicVolume, setMusicVolumeState] = useState<number>(() => {
    const v = parseFloat(localStorage.getItem("nkg_music_volume") || "0.2");
    return isNaN(v) ? 0.2 : v;
  });

  const [dailyAlert, setDailyAlertState] = useState<boolean>(() => {
    return localStorage.getItem("nkg_daily_alert") !== "0";
  });

  const [quizAlert, setQuizAlertState] = useState<boolean>(() => {
    return localStorage.getItem("nkg_quiz_alert") !== "0";
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const data = localStorage.getItem("nkg_user_profile");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });

  const [points, setPoints] = useState<number>(() => {
    return parseInt(localStorage.getItem("dc_points") || "0", 10) || 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem("dc_streak") || "0", 10) || 0;
  });

  // Apply font size
  useEffect(() => {
    const sizes = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.fontSize = sizes[fontSize] || "16px";
  }, [fontSize]);

  // Apply dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nkg_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nkg_theme", "light");
    }
  }, [isDark]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("nkg_lang", newLang);
  };

  const setFontSize = (size: "small" | "medium" | "large") => {
    setFontSizeState(size);
    localStorage.setItem("nkg_font_size", size);
  };

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const setMusicOn = (val: boolean) => {
    setMusicOnState(val);
    localStorage.setItem("nkg_music_on", val ? "1" : "0");
  };

  const setMusicVolume = (val: number) => {
    setMusicVolumeState(val);
    localStorage.setItem("nkg_music_volume", String(val));
  };

  const setDailyAlert = (val: boolean) => {
    setDailyAlertState(val);
    localStorage.setItem("nkg_daily_alert", val ? "1" : "0");
  };

  const setQuizAlert = (val: boolean) => {
    setQuizAlertState(val);
    localStorage.setItem("nkg_quiz_alert", val ? "1" : "0");
  };

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem("nkg_user_profile", JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nkg_user_profile");
  };

  const addPoints = (val: number) => {
    setPoints((prev) => {
      const next = prev + val;
      localStorage.setItem("dc_points", String(next));
      return next;
    });
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      localStorage.setItem("dc_streak", String(next));
      return next;
    });
  };

  const resetProgress = () => {
    setPoints(0);
    setStreak(0);
    localStorage.removeItem("dc_points");
    localStorage.removeItem("dc_streak");
    localStorage.removeItem("nkg_leaderboard");
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
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
        login,
        logout,
        points,
        addPoints,
        streak,
        incrementStreak,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
