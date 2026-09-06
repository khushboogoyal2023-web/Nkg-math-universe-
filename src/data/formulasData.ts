import { FormulaCategory } from "../types";

export const formulasData: FormulaCategory[] = [
  {
    category: "➕ मूलभूत अंकगणित (Basic Arithmetic)",
    items: [
      { name: "जोड़ का क्रमविनिमय नियम", formula: "a + b = b + a" },
      { name: "गुणा का क्रमविनिमय नियम", formula: "a × b = b × a" },
      { name: "शून्य गुणधर्म", formula: "a × 0 = 0" },
      { name: "भाग सत्यापन सूत्र", formula: "भाज्य = (भाजक × भागफल) + शेषफल" },
      { name: "LCM व HCF संबंध", formula: "LCM × HCF = पहली संख्या × दूसरी संख्या" },
      { name: "औसत (Average)", formula: "योग ÷ प्रेक्षणों की संख्या" },
      { name: "प्रतिशत (Percentage)", formula: "(मान / कुल) × 100" }
    ]
  },
  {
    category: "📐 बीजगणित (Algebra)",
    items: [
      { name: "(a + b)²", formula: "a² + 2ab + b²" },
      { name: "(a - b)²", formula: "a² - 2ab + b²" },
      { name: "a² - b²", formula: "(a + b)(a - b)" },
      { name: "(a + b)³", formula: "a³ + 3a²b + 3ab² + b³" },
      { name: "(a - b)³", formula: "a³ - 3a²b + 3ab² - b³" },
      { name: "a³ + b³", formula: "(a + b)(a² - ab + b²)" },
      { name: "a³ - b³", formula: "(a - b)(a² + ab + b²)" },
      { name: "(a + b + c)²", formula: "a² + b² + c² + 2ab + 2bc + 2ca" },
      { name: "a³ + b³ + c³ - 3abc", formula: "(a + b + c)(a² + b² + c² - ab - bc - ca)" }
    ]
  },
  {
    category: "🟥 ज्यामिति — क्षेत्रफल (Area)",
    items: [
      { name: "वर्ग का क्षेत्रफल", formula: "भुजा²" },
      { name: "आयत का क्षेत्रफल", formula: "लंबाई × चौड़ाई" },
      { name: "त्रिभुज का क्षेत्रफल (सामान्य)", formula: "½ × आधार × ऊँचाई" },
      { name: "हीरोन सूत्र (त्रिभुज)", formula: "√[s(s-a)(s-b)(s-c)]" },
      { name: "समबाहु त्रिभुज का क्षेत्रफल", formula: "(√3 / 4) × भुजा²" },
      { name: "वृत्त का क्षेत्रफल", formula: "πr²" },
      { name: "अर्धवृत्त का क्षेत्रफल", formula: "½ × πr²" },
      { name: "समांतर चतुर्भुज का क्षेत्रफल", formula: "आधार × ऊँचाई" },
      { name: "समलंब चतुर्भुज का क्षेत्रफल", formula: "½ × (a + b) × h" },
      { name: "समचतुर्भुज का क्षेत्रफल", formula: "½ × d₁ × d₂" }
    ]
  },
  {
    category: "📏 ज्यामिति — परिमाप (Perimeter)",
    items: [
      { name: "वर्ग का परिमाप", formula: "4 × भुजा" },
      { name: "आयत का परिमाप", formula: "2 × (लंबाई + चौड़ाई)" },
      { name: "वृत्त की परिधि", formula: "2πr = πd" },
      { name: "त्रिभुज का परिमाप", formula: "a + b + c" },
      { name: "समांतर चतुर्भुज का परिमाप", formula: "2 × (a + b)" },
      { name: "समचतुर्भुज का परिमाप", formula: "4 × भुजा" }
    ]
  },
  {
    category: "📦 आयतन (Volume)",
    items: [
      { name: "घन का आयतन", formula: "a³" },
      { name: "घनाभ का आयतन", formula: "l × b × h" },
      { name: "बेलन का आयतन", formula: "πr²h" },
      { name: "शंकु का आयतन", formula: "⅓ × πr²h" },
      { name: "गोले का आयतन", formula: "⁴⁄₃ × πr³" },
      { name: "अर्धगोले का आयतन", formula: "⅔ × πr³" }
    ]
  },
  {
    category: "🏠 पृष्ठीय क्षेत्रफल (Surface Area)",
    items: [
      { name: "घन — कुल पृष्ठीय", formula: "6a²" },
      { name: "घनाभ — कुल पृष्ठीय", formula: "2(lb + bh + lh)" },
      { name: "बेलन — वक्र पृष्ठीय (CSA)", formula: "2πrh" },
      { name: "बेलन — कुल पृष्ठीय (TSA)", formula: "2πr(r + h)" },
      { name: "शंकु — वक्र पृष्ठीय (CSA)", formula: "πrl" },
      { name: "गोले का पृष्ठीय क्षेत्रफल", formula: "4πr²" },
      { name: "अर्धगोला — कुल पृष्ठीय (TSA)", formula: "3πr²" }
    ]
  },
  {
    category: "💰 व्यावसायिक गणित (Commercial Math)",
    items: [
      { name: "लाभ (Profit)", formula: "SP - CP" },
      { name: "हानि (Loss)", formula: "CP - SP" },
      { name: "लाभ %", formula: "(लाभ / CP) × 100" },
      { name: "हानि %", formula: "(हानि / CP) × 100" },
      { name: "साधारण ब्याज (SI)", formula: "(P × R × T) / 100" },
      { name: "मिश्रधन (Amount)", formula: "P + SI" },
      { name: "चाल (Speed)", formula: "दूरी / समय" },
      { name: "दूरी (Distance)", formula: "चाल × समय" }
    ]
  },
  {
    category: "⚡ घातांक नियम (Laws of Exponents)",
    items: [
      { name: "समान आधार पर गुणा", formula: "aᵐ × aⁿ = aᵐ⁺ⁿ" },
      { name: "समान आधार पर भाग", formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ" },
      { name: "घात पर घात", formula: "(aᵐ)ⁿ = aᵐⁿ" },
      { name: "शून्य घात", formula: "a⁰ = 1 (जहाँ a ≠ 0)" },
      { name: "ऋणात्मक घात", formula: "a⁻ⁿ = 1 / aⁿ" },
      { name: "गुणनफल की घात", formula: "(ab)ⁿ = aⁿ × bⁿ" }
    ]
  }
];
