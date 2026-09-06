import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronLeft,
  RefreshCw,
  Home,
  BookOpen,
  Calculator,
  Star,
  Gamepad2,
  CircleHelp,
  Trophy,
  FileText,
  Lightbulb,
  BookCopy,
  User,
  TrendingUp,
  FileDown,
  Blocks,
  Bot,
  Info,
  Shield,
  Phone,
  Headphones,
  Settings,
} from "lucide-react";
import { Logo } from "./Logo";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: string }>;
}

// 10 desktop top navigation items (exact YN.slice(0, 10) from script-2.js)
export const topNavItems: NavItem[] = [
  { path: "/", label: "होम", icon: Home },
  { path: "/classes", label: "कक्षाएं", icon: BookOpen },
  { path: "/tables", label: "पहाड़े", icon: Calculator },
  { path: "/squares-cubes", label: "वर्ग/घन", icon: Star },
  { path: "/games", label: "खेल", icon: Gamepad2 },
  { path: "/quiz", label: "क्विज़", icon: CircleHelp },
  { path: "/daily-challenge", label: "चैलेंज", icon: Trophy },
  { path: "/formulas", label: "सूत्र", icon: FileText },
  { path: "/general-math", label: "सामान्य", icon: Lightbulb },
  { path: "/workbook", label: "वर्कबुक", icon: BookCopy },
];

// Exact 10 drawer navigation items (exact Zq from script-2.js)
export const drawerNavItems: NavItem[] = [
  { path: "/progress", label: "My Profile", icon: User },
  { path: "/progress", label: "My Dashboard", icon: TrendingUp },
  { path: "/patravachan", label: "Ready-made Project Downloads", icon: FileDown },
  { path: "/math-models", label: "Math Lab", icon: Blocks },
  { path: "/study-companion", label: "गणित मित्र (AI)", icon: Bot },
  { path: "/about-us", label: "About Us", icon: Info },
  { path: "/privacy-policy", label: "Privacy Policy", icon: Shield },
  { path: "/contact-us", label: "Contact Us", icon: Phone },
  { path: "/help-support", label: "Help & Support", icon: Headphones },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Subpage check: on subpages show "पीछे जाएं" back button
  const isSubpage =
    !["/", "/classes", "/tables", "/squares-cubes", "/games"].includes(location.pathname) &&
    !location.pathname.startsWith("/class/");

  return (
    <>
      <header
        className="sticky top-0 z-50 text-primary-foreground select-none"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          background:
            "linear-gradient(135deg, hsl(271,76%,53%) 0%, hsl(290,70%,50%) 50%, hsl(271,76%,53%) 100%)",
          boxShadow: "0 5px 0 0 rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* Left Action / Brand */}
          {isSubpage ? (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white rounded-2xl px-3 py-1.5 font-heading text-sm transition min-h-[40px]"
                aria-label="पीछे जाएं"
                style={{
                  border: "2px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 3px 0 rgba(0,0,0,0.15)",
                }}
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">पीछे जाएं</span>
              </button>
              <Link to="/" className="flex items-center gap-1.5">
                <Logo size="sm" />
                <span className="font-heading text-base md:text-lg truncate max-w-[120px] md:max-w-none text-white font-bold">
                  NKG MATH
                </span>
              </Link>
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2" aria-label="NKG Math Universe Home">
              <Logo size="sm" />
              <div>
                <h1 className="font-heading text-xl md:text-2xl leading-tight text-white font-bold">
                  NKG MATH UNIVERSE
                </h1>
                <p className="text-[10px] md:text-xs opacity-80 font-body text-white">
                  गणित सीखो, मज़े करो!
                </p>
              </div>
            </Link>
          )}

          {/* Right Action Controls: Refresh, Menu Button, Desktop Links */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Refresh */}
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-xl hover:bg-white/10 transition min-w-[40px] min-h-[40px] flex items-center justify-center text-white"
              aria-label="रिफ्रेश"
              title="रिफ्रेश करें"
            >
              <RefreshCw size={18} />
            </button>

            {/* Menu Button */}
            <button
              className="p-2.5 rounded-xl hover:bg-white/10 transition min-w-[44px] min-h-[44px] flex items-center justify-center relative text-white"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label={drawerOpen ? "मेनू बंद करें" : "मेनू खोलें"}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 flex-wrap" aria-label="मुख्य नेविगेशन">
              {topNavItems.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-full text-xs font-bold font-body transition-all select-none min-h-[40px] flex items-center ${
                      active
                        ? "bg-white/30 scale-110 shadow-lg text-white"
                        : "text-white hover:bg-white/15 hover:scale-105"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="flex items-center gap-1">
                      <Icon size={14} aria-hidden="true" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <aside
            className="relative ml-auto w-72 max-w-[85vw] h-full bg-card text-foreground shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            {/* Drawer Header with exact primary color */}
            <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo size="sm" />
                <span className="font-heading text-lg font-bold text-white">मेनू</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center text-white"
                aria-label="बंद करें"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Nav Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {drawerNavItems.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-body font-bold transition-all min-h-[52px] ${
                      active
                        ? "bg-primary text-primary-foreground font-extrabold shadow-sm"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground font-body">
                🔢 NKG MATH UNIVERSE © 2026
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
