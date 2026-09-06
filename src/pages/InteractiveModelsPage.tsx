import React, { useState } from "react";
import { Blocks, ArrowLeft, Download } from "lucide-react";

export const InteractiveModelsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  // Model 1: 3D Shapes (Cube & Cylinder)
  const [shapeSide, setShapeSide] = useState(5);
  const [currentShape, setCurrentShape] = useState<"cube" | "cylinder">("cube");

  // Model 2: Digital Abacus
  const [abacus, setAbacus] = useState<[number, number, number]>([0, 0, 0]);
  const abacusNumber = abacus[2] * 100 + abacus[1] * 10 + abacus[0];

  // Model 3: Geoboard
  const [geoPoints, setGeoPoints] = useState<[number, number][]>([]);

  // Model 4: Angle Wheel
  const [angle, setAngle] = useState(45);

  // Model 5: Fraction Wheel
  const [parts, setParts] = useState(4);
  const [colored, setColored] = useState(1);

  const models = [
    {
      id: 1,
      title: "3D ज्यामिति वर्कस्पेस",
      subtitle: "घन और बेलन — आयतन व क्षेत्रफल",
      level: "कक्षा 6-9",
      emoji: "🧊",
      color: "from-indigo-500 to-purple-600",
      desc: "घन और बेलन के आयाम बदलकर live आयतन व कुल पृष्ठीय क्षेत्रफल देखें।",
    },
    {
      id: 2,
      title: "डिजिटल अबाकस (Abacus)",
      subtitle: "मोती खिसकाकर स्थानीय मान सीखें",
      level: "कक्षा 1-3",
      emoji: "🔢",
      color: "from-orange-400 to-amber-500",
      desc: "इकाई, दहाई, सैकड़ा की तारों पर मोतियों की संख्या निर्धारित कर संख्या निर्माण देखें।",
    },
    {
      id: 3,
      title: "डिजिटल जियोबोर्ड (Geoboard)",
      subtitle: "रबर बैंड से आकृतियाँ बनाएं",
      level: "कक्षा 4-7",
      emoji: "📌",
      color: "from-teal-500 to-green-600",
      desc: "5x5 कीलों वाले बोर्ड पर बिंदुओं को जोड़कर ज्यामितीय आकृतियों का परिमाप व क्षेत्रफल ज्ञात करें।",
    },
    {
      id: 4,
      title: "इंटरैक्टिव कोण चक्र (Angle Dial)",
      subtitle: "डायल घुमाकर कोण पहचानें",
      level: "कक्षा 5-8",
      emoji: "🎯",
      color: "from-pink-500 to-rose-600",
      desc: "0° से 360° तक स्लाइडर घुमाएं — न्यूनकोण, समकोण, अधिककोण, ऋजुकोण तुरंत पहचानें।",
    },
    {
      id: 5,
      title: "भिन्न चक्र (Fraction Wheel)",
      subtitle: "चक्र काटकर भिन्न व प्रतिशत समझें",
      level: "कक्षा 3-6",
      emoji: "🍕",
      color: "from-red-500 to-orange-500",
      desc: "चक्र को 2, 3, 4, 6, 8 भागों में बांटकर रंगे हुए भागों का भिन्न व दशमलव मान देखें।",
    },
  ];

  const getAngleName = (deg: number) => {
    if (deg === 0 || deg === 360) return "शून्य / पूर्ण कोण";
    if (deg < 90) return "न्यून कोण (Acute Angle)";
    if (deg === 90) return "समकोण (Right Angle)";
    if (deg < 180) return "अधिक कोण (Obtuse Angle)";
    if (deg === 180) return "ऋजु कोण (Straight Angle)";
    return "प्रतिवर्ती कोण (Reflex Angle)";
  };

  const handleDownload = (m: (typeof models)[0]) => {
    const text = `NKG MATH UNIVERSE — 3D Interactive Model Guide\n==================================================\n\nमॉडल: ${m.title}\nकक्षा: ${m.level}\nविवरण: ${m.desc}\n\n© 2026 NKG MATH UNIVERSE`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Model_${m.id}_Guide.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleGeoPoint = (r: number, c: number) => {
    setGeoPoints((prev) => {
      const exists = prev.find(([pr, pc]) => pr === r && pc === c);
      if (exists) {
        return prev.filter(([pr, pc]) => !(pr === r && pc === c));
      }
      return [...prev, [r, c]];
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-4 shadow-xl">
            <Blocks size={36} />
          </div>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl mb-1 text-foreground">
          🎮 Interactive 3D Math Models
        </h1>
        <p className="font-body text-xs text-muted-foreground">
          5 इंटरैक्टिव टूल्स — छूकर, चलाकर और खेलकर गणित समझें!
        </p>
      </div>

      {selectedModel === null ? (
        /* Grid of 5 Models */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className="cursor-pointer group"
            >
              <div
                className={`bg-gradient-to-br ${m.color} text-white rounded-3xl p-5 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all h-full flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-2">{m.emoji}</div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-body">
                    {m.level}
                  </span>
                  <h3 className="font-heading text-lg mt-2 mb-1">{m.title}</h3>
                  <p className="font-body text-xs opacity-85 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="font-heading text-xs">खोलें →</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(m);
                    }}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                    title="गाइड डाउनलोड करें"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detail Interactive View */
        <div className="bg-card border rounded-3xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedModel(null)}
              className="flex items-center gap-1.5 text-xs font-heading font-bold text-primary hover:underline min-h-0"
            >
              <ArrowLeft size={16} /> सभी मॉडल्स
            </button>
            <button
              onClick={() => {
                const cur = models.find((m) => m.id === selectedModel);
                if (cur) handleDownload(cur);
              }}
              className="flex items-center gap-1 text-xs bg-muted px-3 py-1.5 rounded-xl font-bold font-body text-muted-foreground hover:text-foreground"
            >
              <Download size={14} /> गाइड डाउनलोड
            </button>
          </div>

          {/* Interactive Model 1: 3D Shapes */}
          {selectedModel === 1 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentShape("cube")}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold ${
                    currentShape === "cube"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  घन (Cube)
                </button>
                <button
                  onClick={() => setCurrentShape("cylinder")}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold ${
                    currentShape === "cylinder"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  बेलन (Cylinder)
                </button>
              </div>

              {currentShape === "cube" ? (
                <div className="space-y-3">
                  <div className="flex justify-center py-4">
                    <div
                      className="border-4 border-primary/40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-heading text-2xl shadow-xl transition-all"
                      style={{
                        width: shapeSide * 20 + 60,
                        height: shapeSide * 20 + 60,
                      }}
                    >
                      a = {shapeSide} cm
                    </div>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <label className="font-body text-xs font-bold block mb-1">
                      भुजा (a) = {shapeSide} cm
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={shapeSide}
                      onChange={(e) => setShapeSide(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <div className="bg-primary/10 rounded-2xl p-3 border border-primary/20">
                      <p className="font-body text-xs text-muted-foreground">आयतन (Volume)</p>
                      <p className="font-heading text-xl text-primary">{shapeSide ** 3} cm³</p>
                      <p className="text-[10px] text-muted-foreground">V = a³</p>
                    </div>
                    <div className="bg-secondary/10 rounded-2xl p-3 border border-secondary/20">
                      <p className="font-body text-xs text-muted-foreground">कुल पृष्ठीय (TSA)</p>
                      <p className="font-heading text-xl text-secondary">
                        {6 * shapeSide ** 2} cm²
                      </p>
                      <p className="text-[10px] text-muted-foreground">SA = 6a²</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center py-4">
                    <div
                      className="border-4 border-teal-500/40 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white font-heading text-xl shadow-xl"
                      style={{
                        width: 100,
                        height: shapeSide * 20 + 60,
                      }}
                    >
                      r=3.5, h={shapeSide * 2}
                    </div>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <label className="font-body text-xs font-bold block mb-1">
                      ऊंचाई (h) = {shapeSide * 2} cm
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={shapeSide}
                      onChange={(e) => setShapeSide(Number(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3 border border-teal-200">
                      <p className="font-body text-xs text-muted-foreground">आयतन (Volume)</p>
                      <p className="font-heading text-xl text-teal-600">
                        {Math.round(Math.PI * 3.5 * 3.5 * shapeSide * 2)} cm³
                      </p>
                      <p className="text-[10px] text-muted-foreground">V = πr²h</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-3 border border-emerald-200">
                      <p className="font-body text-xs text-muted-foreground">वक्र पृष्ठीय (CSA)</p>
                      <p className="font-heading text-xl text-emerald-600">
                        {Math.round(2 * Math.PI * 3.5 * shapeSide * 2)} cm²
                      </p>
                      <p className="text-[10px] text-muted-foreground">CSA = 2πrh</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Model 2: Abacus */}
          {selectedModel === 2 && (
            <div className="space-y-4 text-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl p-4">
                <p className="font-body text-xs text-amber-700">वर्तमान निर्मित संख्या</p>
                <p className="font-heading text-5xl text-amber-800 dark:text-amber-300">
                  {abacusNumber}
                </p>
              </div>
              <div className="flex justify-center gap-6">
                {[
                  { label: "सैकड़ा (100s)", idx: 2 },
                  { label: "दहाई (10s)", idx: 1 },
                  { label: "इकाई (1s)", idx: 0 },
                ].map(({ label, idx }) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() =>
                        setAbacus((prev) => {
                          const next: [number, number, number] = [prev[0], prev[1], prev[2]];
                          next[idx] = Math.min(9, next[idx] + 1);
                          return next;
                        })
                      }
                      className="w-10 h-10 rounded-xl bg-primary text-white font-bold text-lg"
                    >
                      +
                    </button>
                    <div className="w-12 h-44 bg-amber-100 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-300 relative flex flex-col-reverse items-center p-1 gap-1">
                      {Array.from({ length: abacus[idx] }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-3.5 bg-amber-500 rounded-full shadow-sm"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setAbacus((prev) => {
                          const next: [number, number, number] = [prev[0], prev[1], prev[2]];
                          next[idx] = Math.max(0, next[idx] - 1);
                          return next;
                        })
                      }
                      className="w-10 h-10 rounded-xl bg-muted font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="font-body text-[11px] font-bold">{label}</span>
                    <span className="font-heading text-lg text-primary">{abacus[idx]}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAbacus([0, 0, 0])}
                className="px-4 py-2 border rounded-xl font-body text-xs text-muted-foreground hover:text-foreground"
              >
                रीसेट करें
              </button>
            </div>
          )}

          {/* Interactive Model 3: Geoboard */}
          {selectedModel === 3 && (
            <div className="space-y-4 text-center">
              <p className="font-body text-xs text-muted-foreground">
                कीलों पर टैप करके रेखाएं खींचें व आकृतियों का निर्माण करें।
              </p>
              <div className="grid grid-cols-5 gap-3 max-w-xs mx-auto p-4 bg-muted/40 rounded-3xl border">
                {Array.from({ length: 25 }).map((_, idx) => {
                  const r = Math.floor(idx / 5);
                  const c = idx % 5;
                  const selected = geoPoints.some(([pr, pc]) => pr === r && pc === c);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleGeoPoint(r, c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center min-h-0 min-w-0 ${
                        selected
                          ? "bg-primary border-primary text-white shadow-md scale-110"
                          : "bg-card border-border hover:border-primary/50 text-xs"
                      }`}
                    >
                      •
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 text-xs font-body">
                <span>चयनित बिंदु: <strong>{geoPoints.length}</strong></span>
                <button
                  onClick={() => setGeoPoints([])}
                  className="text-destructive underline"
                >
                  सभी साफ़ करें
                </button>
              </div>
            </div>
          )}

          {/* Interactive Model 4: Angle Wheel */}
          {selectedModel === 4 && (
            <div className="space-y-4 text-center max-w-sm mx-auto">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center border-4 border-border rounded-full bg-muted/20">
                <div
                  className="absolute w-20 h-1 bg-primary origin-left transition-transform"
                  style={{ transform: `rotate(${angle}deg)` }}
                />
                <div className="w-4 h-4 rounded-full bg-primary z-10" />
              </div>
              <div className="space-y-1">
                <p className="font-heading text-4xl text-primary">{angle}°</p>
                <p className="font-heading text-base text-foreground">{getAngleName(angle)}</p>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          )}

          {/* Interactive Model 5: Fraction Wheel */}
          {selectedModel === 5 && (
            <div className="space-y-4 text-center max-w-sm mx-auto">
              <div className="relative w-44 h-44 mx-auto rounded-full border-4 border-border overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-primary transition-all"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${
                      (colored / parts) * 100
                    }% 0%, 100% 100%, 0% 100%)`,
                  }}
                />
                <span className="font-heading text-3xl z-10 bg-card/80 px-3 py-1 rounded-2xl">
                  {colored}/{parts}
                </span>
              </div>
              <div className="flex justify-center gap-2">
                {[2, 3, 4, 6, 8].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setParts(p);
                      setColored((c) => Math.min(c, p));
                    }}
                    className={`px-3 py-1.5 rounded-xl font-body text-xs font-bold ${
                      parts === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    1/{p}
                  </button>
                ))}
              </div>
              <div>
                <label className="font-body text-xs block mb-1">रंगे हुए भाग: {colored}</label>
                <input
                  type="range"
                  min="0"
                  max={parts}
                  value={colored}
                  onChange={(e) => setColored(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <p className="font-body text-xs text-muted-foreground">
                दशमलव रूप: {(colored / parts).toFixed(2)} | प्रतिशत: {Math.round((colored / parts) * 100)}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
