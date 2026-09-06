import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "NKG Math Universe" });
});

// Fallback Math Solver logic when API key is missing or offline
function localMathSolver(problem: string) {
  const p = problem.trim().toLowerCase();
  
  // Multiplication pattern e.g. 98 * 97 or 98 x 97 or 98 × 97
  const multMatch = p.match(/(\d+)\s*[\*xX×]\s*(\d+)/);
  if (multMatch) {
    const a = parseInt(multMatch[1], 10);
    const b = parseInt(multMatch[2], 10);
    const ans = a * b;
    return {
      steps: [
        { label: "दिए गए मान", content: `संख्या 1 = ${a}, संख्या 2 = ${b}`, formula: "a × b" },
        { label: "विधि", content: a > 90 && b > 90 && a < 100 && b < 100 
            ? `वैदिक निखिलं विधि (आधार = 100): ${a}=100-${100-a}, ${b}=100-${100-b}. बायाँ = ${a}-${100-b} = ${a-(100-b)}, दायाँ = ${100-a}×${100-b} = ${(100-a)*(100-b)}` 
            : `गुणनफल: ${a} को ${b} से गुणा करने पर`, formula: `${a} × ${b}` },
        { label: "गणना", content: `${a} × ${b} = ${ans}`, formula: null },
        { label: "अंतिम उत्तर", content: `उत्तर = ${ans}`, formula: null }
      ],
      why: "गुणनफल एक संख्या को दूसरी संख्या के बराबर बार जोड़ने की संक्रिया है।",
      concept: "गुणा (Multiplication)"
    };
  }

  // Square pattern e.g. 15^2, 15², 15 * 15
  const sqMatch = p.match(/(\d+)\s*(?:\^2|²|\s*का\s*वर्ग)/);
  if (sqMatch) {
    const n = parseInt(sqMatch[1], 10);
    const ans = n * n;
    return {
      steps: [
        { label: "दिए गए मान", content: `संख्या n = ${n}`, formula: "n² = n × n" },
        { label: "विधि", content: n % 10 === 5 
            ? `एकाधिकेन पूर्वेण सूत्र: दहाई अंक ${Math.floor(n/10)} × (${Math.floor(n/10)}+1) = ${Math.floor(n/10)*(Math.floor(n/10)+1)}, अंत में 25 जोड़ें` 
            : `संख्या ${n} को स्वयं से गुणा करें`, formula: `${n} × ${n}` },
        { label: "गणना", content: `${n}² = ${n} × ${n} = ${ans}`, formula: null },
        { label: "अंतिम उत्तर", content: `उत्तर = ${ans}`, formula: null }
      ],
      why: "किसी संख्या का वर्ग उस संख्या को स्वयं से गुणा करके प्राप्त किया जाता है।",
      concept: "वर्ग (Square)"
    };
  }

  // Linear equation e.g. 2x + 5 = 11
  const eqMatch = p.match(/(\d*)\s*x\s*([\+\-])\s*(\d+)\s*=\s*(\d+)/);
  if (eqMatch) {
    const a = eqMatch[1] ? parseInt(eqMatch[1], 10) : 1;
    const sign = eqMatch[2];
    const b = parseInt(eqMatch[3], 10);
    const c = parseInt(eqMatch[4], 10);
    const rhs = sign === "+" ? c - b : c + b;
    const x = rhs / a;
    return {
      steps: [
        { label: "समीकरण", content: `${a}x ${sign} ${b} = ${c}`, formula: "ax ± b = c" },
        { label: "पक्षांतरण", content: `${b} को दाईं ओर ले जाने पर: ${a}x = ${c} ${sign === "+" ? "-" : "+"} ${b} = ${rhs}`, formula: null },
        { label: "x का मान", content: `दोनों पक्षों को ${a} से भाग देने पर: x = ${rhs} ÷ ${a} = ${x}`, formula: `x = ${x}` },
        { label: "अंतिम उत्तर", content: `उत्तर: x = ${x}`, formula: null }
      ],
      why: "समीकरण के दोनों पक्षों में समान संक्रिया करने पर समीकरण संतुलित रहता है।",
      concept: "रैखिक समीकरण (Linear Equation)"
    };
  }

  // Default step response
  return {
    steps: [
      { label: "प्रश्न का विश्लेषण", content: `प्रश्न: "${problem}"`, formula: null },
      { label: "विधि", content: "गणितीय नियमों और बुनियादी सूत्रों का प्रयोग करके समाधान निकालें।", formula: null },
      { label: "सुझाव", content: "यदि आप विशिष्ट संख्या या समीकरण (जैसे '15²' या '2x + 5 = 11') पूछेंगे, तो तुरंत सटीक गणना मिलेगी!", formula: null },
      { label: "अंतिम उत्तर", content: `समीक्षा पूर्ण — स्पष्ट संख्यात्मक इनपुट दर्ज करें।`, formula: null }
    ],
    why: "गणित में प्रत्येक समस्या एक निश्चित नियम और तर्क पर आधारित होती है।",
    concept: "सामान्य गणित (General Math)"
  };
}

// API: AI Solver
app.post("/api/ai-solver", async (req, res) => {
  const { problem, grade } = req.body;
  if (!problem || typeof problem !== "string") {
    return res.status(400).json({ error: "कृपया गणित का प्रश्न दर्ज करें।" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json(localMathSolver(problem));
  }

  try {
    const prompt = `आप एक उत्कृष्ट और मित्रवत गणित शिक्षक हैं जो कक्षा 1 से 9 के बच्चों को पढ़ाते हैं।
विद्यार्थी का प्रश्न: "${problem}"
कक्षा संदर्भ: ${grade || "कक्षा 1 से 9"}

कृपया इस प्रश्न का चरण-दर-चरण (Step-by-Step) हल हिंदी में तैयार करें।
उत्तर को केवल वैध JSON प्रारूप में दें:
{
  "steps": [
    { "label": "दिए गए मान / चरण का नाम", "content": "सरल व्याख्या", "formula": "सूत्र (यदि लागू हो, अन्यथा null)" }
  ],
  "why": "यह विधि या सूत्र क्यों कार्य करता है (1-2 सरल वाक्य)",
  "concept": "अवधारणा का नाम (जैसे: LCM, क्षेत्रफल, द्विघात समीकरण आदि)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "आप 'NKG Math Universe' के आधिकारिक AI गणितज्ञ हैं। सरल, सटीक और उत्साहवर्धक हिंदी भाषा में उत्तर दें।",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  content: { type: Type.STRING },
                  formula: { type: Type.STRING, nullable: true },
                },
                required: ["label", "content"],
              },
            },
            why: { type: Type.STRING },
            concept: { type: Type.STRING },
          },
          required: ["steps", "why", "concept"],
        },
      },
    });

    const text = response.text ? response.text.trim() : "";
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error) {
    console.error("Gemini AI Solver Error:", error);
    return res.json(localMathSolver(problem));
  }
});

// API: Study Companion / गणित मित्र (Chat)
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user")?.content || "";
    let reply = "नमस्ते! मैं 'गणित मित्र' हूँ! 🙋‍♂️ गणित में किसी भी प्रश्न के समाधान, पहाड़ों, सूत्रों, या खेल के बारे में मुझसे पूछें!";
    if (lastUserMsg.includes("भिन्न") || lastUserMsg.includes("fraction")) {
      reply = "भिन्न (Fraction) किसी पूरी वस्तु के हिस्से को दर्शाता है! जैसे एक पिज़्ज़ा के 4 टुकड़े किए और 1 खाया, तो वह 1/4 हुआ। ऊपर का अंक 'अंश' (Numerator) और नीचे का 'हर' (Denominator) कहलाता है! 🍕";
    } else if (lastUserMsg.includes("पहाड़ा") || lastUserMsg.includes("table")) {
      reply = "पहाड़े याद करने के लिए हमारे 'पहाड़े' और 'खेल' सेक्शन में जाएं! जैसे 9 का पहाड़ा उंगलियों पर या 5 का पहाड़ा हमेशा 0 या 5 पर खत्म होता है। 🔢";
    } else if (lastUserMsg.includes("वैदिक") || lastUserMsg.includes("vedic") || lastUserMsg.includes("98")) {
      reply = "वैदिक गणित से 98 × 97 हल करना बहुत आसान है! 100 को आधार लें: 98 की कमी 2 है (-2), 97 की कमी 3 है (-3)। बायाँ भाग: 98 - 3 = 95। दायाँ भाग: 2 × 3 = 06। अतः उत्तर = 9506! ✨";
    } else if (lastUserMsg.includes("क्विज़") || lastUserMsg.includes("quiz")) {
      reply = "आपके लिए एक तुरंत सवाल: 15 का वर्ग (15²) क्या होता है? संकेत: 1 × 2 = 2 और अंत में 25 लगाएं! उत्तर बताओ! 🎯";
    }
    return res.json({ reply });
  }

  try {
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: `आप 'NKG Math Universe' के आत्मीय और चुलबुले AI अध्ययन साथी 'गणित मित्र' हैं।
आप कक्षा 1 से 9 तक के बच्चों को गणित सिखाते हैं।
- आपकी भाषा सरल, उत्साहवर्धक, शुद्ध व सहज हिंदी (Hinglish यदि आवश्यक हो) है।
- आप बच्चों को गणित का डर निकालने में मदद करते हैं, रोचक उदाहरण, वैदिक ट्रिक्स और पहेलियों से समझाते हैं।
- उत्तर संक्षिप्त, स्पष्ट, और दोस्ताना रखें। इमोजी का प्रयोग स्वाभाविक रूप से करें।`,
      },
    });

    return res.json({ reply: response.text || "माफ़ कीजिए, मैं समझ नहीं पाया। कृपया दोबारा पूछें।" });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return res.json({ reply: "माफ़ कीजिए, अभी सर्वर व्यस्त है। कृपया थोड़ी देर बाद प्रयास करें!" });
  }
});

// Vite Middleware for dev & static serving for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NKG Math Universe server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
