import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Headphones, BookOpen, Gamepad2, Trophy, User, ChevronDown, Phone } from "lucide-react";

export const HelpSupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quickLinks = [
    { icon: BookOpen, label: "कक्षाएं", path: "/classes", color: "from-purple-500 to-indigo-600" },
    { icon: Gamepad2, label: "खेल", path: "/games", color: "from-yellow-400 to-orange-500" },
    { icon: Trophy, label: "चैलेंज", path: "/daily-challenge", color: "from-green-500 to-teal-600" },
    { icon: User, label: "प्रगति", path: "/progress", color: "from-blue-500 to-cyan-600" },
  ];

  const faqs = [
    {
      q: "क्विज़ कैसे खेलें?",
      a: "होम पेज या साइडबार से 'क्विज़' चुनें। अपनी कक्षा चुनकर 10 बहुविकल्पीय सवालों के जवाब दें। सही उत्तर पर तुरंत अंक व संकेत मिलते हैं।",
    },
    {
      q: "दैनिक चुनौती (Daily Challenge) में क्या होता है?",
      a: "हर दिन 3 नए सवाल अपडेट होते हैं। तीनों सवाल सही हल करने पर आपकी दैनिक स्ट्रीक (Streak) बढ़ती है और नए बैज अनलॉक होते हैं।",
    },
    {
      q: "क्या गणित के नोट्स डाउनलोड किए जा सकते हैं?",
      a: "हाँ! कक्षा विवरण (Class Detail) या वर्कशीट (Worksheets) पेज पर 'डाउनलोड' बटन दबाकर आप संपूर्ण पाठ्य सामग्री TXT/PDF रूप में डाउनलोड कर सकते हैं।",
    },
    {
      q: "वैदिक गणित क्या है और इसे कैसे सीखें?",
      a: "वैदिक गणित में 16 प्राचीन सूत्र हैं, जिनकी मदद से 98 × 97 जैसी बड़ी गणनाएं सिर्फ 5 सेकंड में मानसिक रूप से की जा सकती हैं। ऐप में 'वैदिक' सेक्शन में चरणबद्ध उदाहरण दिए गए हैं।",
    },
    {
      q: "बैकग्राउंड म्यूजिक कैसे बंद या चालू करें?",
      a: "सेटिंग्स (Settings) पेज पर जाकर 'बैकग्राउंड संगीत' टॉगल को अपनी इच्छानुसार चालू अथवा बंद कर सकते हैं और आवाज़ भी नियंत्रित कर सकते हैं।",
    },
    {
      q: "डार्क मोड कैसे ऑन करें?",
      a: "सेटिंग्स पेज में 'डार्क मोड' स्विच पर टैप करें। यह आँखों की सुरक्षा और कम रोशनी में पढ़ाई के लिए बेहद उपयोगी है।",
    },
    {
      q: "मेरी प्रगति और स्कोर कहाँ दिखेंगे?",
      a: "'मेरी प्रगति (Progress)' पेज पर जाकर आप अपने कुल पॉइंट्स, दैनिक स्ट्रीक, अनलॉक किए गए पदक और विषयवार प्रगति देख सकते हैं।",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-4 shadow-xl">
            <Headphones size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl mb-1 text-foreground">
          सहायता केंद्र (Help & Support)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          सवालों के जवाब और मार्गदर्शन प्राप्त करें! 🤝
        </p>
      </div>

      {/* Quick Navigation Links */}
      <div>
        <h2 className="font-heading text-base mb-2.5 text-center text-foreground">
          त्वरित शॉर्टकट ⚡
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {quickLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={i} to={item.path} className="block">
                <div className="bg-card border rounded-2xl p-3 text-center shadow-sm hover:border-primary transition">
                  <div
                    className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-2 w-fit mx-auto mb-1`}
                  >
                    <Icon size={18} />
                  </div>
                  <p className="font-body text-[10px] font-bold text-foreground truncate">
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-2">
        <h2 className="font-heading text-base mb-2 text-center text-foreground">
          अक्सर पूछे जाने वाले सवाल (FAQs) ❓
        </h2>
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-3.5 text-left min-h-0"
              >
                <span className="font-heading text-sm text-foreground pr-2 leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-border/50">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-5 text-center shadow-md">
        <h3 className="font-heading text-base mb-1">क्या आपको अतिरिक्त सहायता चाहिए?</h3>
        <p className="font-body text-xs opacity-85 mb-3">
          हमारी समर्पित सहायता टीम से सीधे संपर्क करें।
        </p>
        <Link
          to="/contact-us"
          className="inline-flex items-center gap-1.5 bg-white text-purple-700 font-heading text-xs px-5 py-2.5 rounded-xl shadow font-bold hover:scale-105 transition"
        >
          <Phone size={14} /> संपर्क केंद्र खोलें
        </Link>
      </div>
    </div>
  );
};
