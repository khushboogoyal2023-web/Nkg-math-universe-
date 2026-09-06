import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const ContactUsPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    try {
      const messages = JSON.parse(localStorage.getItem("nkg_contact_messages") || "[]");
      messages.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem("nkg_contact_messages", JSON.stringify(messages));
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setSent(true);
    }
  };

  const contactCards = [
    { icon: Mail, label: "ईमेल सहायता", value: "support@nkgmathuniverse.com", color: "from-blue-500 to-indigo-600" },
    { icon: Phone, label: "हेल्पलाइन फ़ोन", value: "+91 98765 43210", color: "from-green-500 to-teal-600" },
    { icon: MessageSquare, label: "WhatsApp सहायता", value: "+91 98765 43210", color: "from-emerald-500 to-green-600" },
    { icon: MapPin, label: "स्थान", value: "नई दिल्ली, भारत 🇮🇳", color: "from-orange-500 to-red-500" },
    { icon: Clock, label: "कार्य समय", value: "सोमवार - शनिवार, 9:00 AM - 6:00 PM", color: "from-purple-500 to-violet-600" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-3xl p-4 shadow-xl">
            <Phone size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl mb-1 text-foreground">
          संपर्क करें (Contact Us)
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          हमसे बात करें — हम आपकी सहायता के लिए सदैव तत्पर हैं! 💬
        </p>
      </div>

      {/* Info Cards */}
      <div className="space-y-2.5">
        {contactCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-card border rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm"
            >
              <div
                className={`bg-gradient-to-br ${card.color} text-white rounded-xl p-2.5 shrink-0`}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-body text-[11px] text-muted-foreground">{card.label}</p>
                <p className="font-heading text-sm text-foreground truncate">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Send Message Form */}
      <div className="bg-card border rounded-2xl p-5 shadow-sm">
        <h2 className="font-heading text-lg mb-3 text-center text-foreground">
          हमें संदेश भेजें ✉️
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="आपका नाम (Your Name)"
            className="w-full px-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ईमेल पता (वैकल्पिक)"
            className="w-full px-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="आपका संदेश, सुझाव या प्रश्न लिखें..."
            className="w-full px-4 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />

          {sent && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl text-xs font-body">
              <CheckCircle2 size={16} /> संदेश सफलतापूर्वक प्राप्त हुआ! हम शीघ्र संपर्क करेंगे।
            </div>
          )}

          <button
            type="submit"
            disabled={!form.name || !form.message}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-heading text-base flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 min-h-0"
          >
            <Send size={16} /> संदेश भेजें
          </button>
        </form>
      </div>
    </div>
  );
};
