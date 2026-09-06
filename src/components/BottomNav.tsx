import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Calculator, Star, Gamepad2 } from "lucide-react";

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { path: "/", label: "होम", icon: Home },
    { path: "/classes", label: "कक्षाएं", icon: BookOpen },
    { path: "/tables", label: "पहाड़े", icon: Calculator },
    { path: "/squares-cubes", label: "वर्ग/घन", icon: Star },
    { path: "/games", label: "खेल", icon: Gamepad2 },
  ];

  return (
    <nav
      aria-label="बॉटम नेविगेशन"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 select-none bg-white dark:bg-[#261c31]"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        borderTop: "3px solid hsl(var(--border))",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex items-stretch">
        {items.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-all relative ${
                active
                  ? "text-primary scale-110 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <div className="absolute top-0 h-0.5 w-10 bg-primary rounded-full" />
              )}
              <Icon size={22} aria-hidden="true" />
              <span className="text-[10px] font-bold font-body leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
