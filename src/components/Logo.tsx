import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const config = {
    sm: { outer: "w-10 h-10", text: "text-xs", sub: "text-[7px]" },
    md: { outer: "w-14 h-14", text: "text-sm", sub: "text-[8px]" },
    lg: { outer: "w-20 h-20", text: "text-lg", sub: "text-[10px]" },
    xl: { outer: "w-28 h-28", text: "text-2xl", sub: "text-xs" },
  }[size];

  return (
    <div className={`${config.outer} relative flex-shrink-0 select-none`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-lg flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center">
          <span className={`font-heading text-white ${config.text} leading-none tracking-tight font-bold`}>
            NKG
          </span>
          <span className={`font-body text-yellow-300 font-extrabold ${config.sub} leading-none mt-0.5 tracking-wider`}>
            MATH
          </span>
        </div>
      </div>
      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />
      <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-pink-400 rounded-full border border-white" />
    </div>
  );
};
