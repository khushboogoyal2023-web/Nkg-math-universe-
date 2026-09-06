import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
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

export const ClassesPage: React.FC = () => {
  const classesList = Object.entries(classesData).map(([key, val]) => ({
    classNumber: Number(key),
    ...val,
    color: classColors[Number(key)] || "from-primary to-indigo-600",
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <BookOpen size={16} />
          <span>कक्षा 1 से 9 का पाठ्यक्रम</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          अपनी कक्षा चुनें 🎒
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
          एनसीईआरटी (NCERT) और राज्य बोर्ड पर आधारित पूर्ण पाठ्यक्रम, अवधारणाएं, सूत्र और अभ्यास प्रश्न।
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesList.map((cls) => (
          <Link
            key={cls.classNumber}
            to={`/classes/${cls.classNumber}`}
            className="group relative bg-card rounded-3xl border-2 border-border hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top Color Banner */}
            <div className={`bg-gradient-to-r ${cls.color} p-5 text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-4xl">{cls.emoji}</span>
                <span className="bg-white/25 text-white font-heading font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  कक्षा {cls.classNumber}
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold mt-2 text-white">
                {cls.name}
              </h2>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-heading text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                  प्रमुख विषय व अध्याय ({cls.topics.length}):
                </span>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cls.topics.slice(0, 5).map((topic, i) => (
                    <span
                      key={i}
                      className="text-xs font-body font-semibold bg-muted px-2.5 py-1 rounded-xl text-foreground/80"
                    >
                      {topic.title}
                    </span>
                  ))}
                  {cls.topics.length > 5 && (
                    <span className="text-xs font-body font-semibold bg-muted/60 px-2 py-1 rounded-xl text-muted-foreground">
                      +{cls.topics.length - 5} और
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-primary font-heading font-bold text-sm group-hover:translate-x-1 transition-transform">
                <span>अध्याय खोलें व सीखें</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
