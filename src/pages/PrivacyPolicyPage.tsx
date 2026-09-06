import React from "react";
import { Shield, Eye, Lock, Server, Mail } from "lucide-react";

export const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      icon: Shield,
      title: "बच्चों की सुरक्षा और गोपनीयता",
      desc: "यह एप्लिकेशन प्राथमिक व माध्यमिक कक्षाओं के विद्यार्थियों के उपयोग के लिए तैयार किया गया है। हम किसी भी बच्चे की व्यक्तिगत संवेदनशील जानकारी (जैसे बैंक विवरण, आधार आदि) एकत्रित नहीं करते।",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Eye,
      title: "एकत्रित की जाने वाली जानकारी",
      desc: "क्विज़ स्कोर, स्ट्रीक पॉइंट्स, चयनित भाषा, अक्षर आकार और डार्क मोड सेटिंग केवल आपके अपने ब्राउज़र के LocalStorage में संग्रहीत होते हैं। यह डेटा किसी बाहरी सर्वर पर नहीं भेजा जाता।",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Lock,
      title: "डेटा सुरक्षा और नियंत्रण",
      desc: "उपयोगकर्ता कभी भी Settings पेज में जाकर 'Cache साफ़ करें' अथवा 'अकाउंट डिलीट करें' विकल्प द्वारा अपने संपूर्ण स्थानीय डेटा को एक क्लिक में हटा सकते हैं।",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Server,
      title: "तृतीय-पक्ष सामग्री",
      desc: "एप्लिकेशन में प्रदर्शित सभी गणितीय सामग्री, सूत्र, परिभाषाएं एवं ऑडियो वाचन शैक्षणिक उद्देश्य से उपलब्ध कराए गए हैं।",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Mail,
      title: "हमसे संपर्क करें",
      desc: "गोपनीयता या सामग्री संबंधी किसी भी प्रकार के सुझाव अथवा प्रश्न हेतु आप हमारे संपर्क केंद्र (Contact Us) के माध्यम से संपर्क कर सकते हैं।",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Title */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-3xl p-4 shadow-xl">
            <Shield size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl mb-1 text-foreground">
          गोपनीयता नीति (Privacy Policy)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          आपकी गोपनीयता एवं डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है 🔒
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-4 text-center">
        <p className="font-body text-xs text-green-700 dark:text-green-300 font-semibold">
          ✅ NKG MATH UNIVERSE सुरक्षित, बाल-अनुकूल और विज्ञापन-नियंत्रित वातावरण प्रदान करता है।
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          return (
            <div key={i} className="bg-card border rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div
                  className={`bg-gradient-to-br ${sec.color} text-white rounded-2xl p-2.5 shrink-0`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h2 className="font-heading text-base mb-1 text-foreground">{sec.title}</h2>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border rounded-2xl p-4 text-center shadow-sm">
        <p className="font-body text-xs text-muted-foreground">
          यह नीति वर्ष 2026 हेतु अद्यतन है। NKG MATH UNIVERSE © 2026
        </p>
      </div>
    </div>
  );
};
