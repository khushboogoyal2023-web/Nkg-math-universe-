import React from "react";
import { Info, BookOpen, Sparkles, Award, Target, Users } from "lucide-react";

export const AboutUsPage: React.FC = () => {
  const highlights = [
    {
      icon: BookOpen,
      title: "कक्षा 1-9 संपूर्ण पाठ्यक्रम",
      desc: "हर कक्षा के लिए विस्तृत अध्याय, सचित्र उदाहरण और अभ्यास पत्रक।",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: Sparkles,
      title: "20+ गणित खेल",
      desc: "खेल-खेल में गणित सीखें — स्पीड मैथ, पहाड़ा क्विज़, भिन्न मिलाओ।",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Award,
      title: "50+ क्विज़ व प्रतियोगिता",
      desc: "हर कक्षा में विस्तृत सवाल — तत्काल फीडबैक और स्कोरिंग के साथ।",
      color: "from-red-400 to-rose-600",
    },
    {
      icon: Target,
      title: "दैनिक चुनौती (Daily Challenge)",
      desc: "हर दिन 3 नए सवाल — दैनिक स्ट्रीक बनाएं और बैज जीतें।",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: BookOpen,
      title: "16 वैदिक गणित सूत्र",
      desc: "प्राचीन भारतीय गणितीय सूत्रों से सुपरफास्ट गणना विधि।",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: Users,
      title: "महान गणितज्ञों की गाथा",
      desc: "आर्यभट्ट, रामानुजन, ब्रह्मगुप्त और शकुंतला देवी की प्रेरक खोजें।",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-4 shadow-xl">
            <Info size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          हमारे बारे में (About Us)
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          NKG MATH UNIVERSE — गणित की संपूर्ण एवं आनंदमयी दुनिया
        </p>
      </div>

      {/* Mission Banner */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-3xl p-6 shadow-xl space-y-2">
        <div className="text-3xl">🎯</div>
        <h2 className="font-heading text-xl">हमारा उद्देश्य</h2>
        <p className="font-body text-sm opacity-90 leading-relaxed">
          NKG MATH UNIVERSE का मुख्य उद्देश्य प्रत्येक बच्चे के मन से गणित का भय समाप्त कर उसमें गणितीय जिज्ञासा, तार्किक चिंतन और आत्मविश्वास का संचार करना है। खेल, सचित्र व्याख्या और वैदिक विधियों द्वारा गणित को सबसे प्रिय विषय बनाना हमारा संकल्प है।
        </p>
      </div>

      {/* Highlights Grid */}
      <div>
        <h2 className="font-heading text-lg mb-3 text-center text-foreground">
          ऐप की प्रमुख विशेषताएं
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-card border rounded-2xl p-4 flex items-center gap-3 shadow-sm"
              >
                <div
                  className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-2.5 shrink-0`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-heading text-sm text-foreground">{item.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: "9", label: "कक्षाएं", emoji: "📚" },
          { num: "20+", label: "खेल", emoji: "🎮" },
          { num: "16", label: "वैदिक सूत्र", emoji: "🕉️" },
          { num: "100+", label: "मॉडल विचार", emoji: "🔬" },
        ].map((item, i) => (
          <div key={i} className="bg-card border rounded-2xl p-3 text-center shadow-sm">
            <div className="text-xl mb-0.5">{item.emoji}</div>
            <div className="font-heading text-lg text-primary font-bold">{item.num}</div>
            <div className="text-[10px] font-body text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-5 text-center shadow-md">
        <div className="text-2xl mb-1">🔢</div>
        <h2 className="font-heading text-lg">NKG MATH UNIVERSE</h2>
        <p className="font-body text-xs opacity-80">© 2026 | सर्वाधिकार सुरक्षित</p>
      </div>
    </div>
  );
};
