import React, { useRef, useState, useEffect } from "react";
import {
  BookCopy,
  Eraser,
  PenTool,
  RotateCcw,
  Download,
  Grid,
  Trash2,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const WorkbookPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2563eb");
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [gridMode, setGridMode] = useState<"grid" | "lines" | "blank">("grid");

  // Practice problem prompt
  const practiceProblems = [
    { title: "जोड़ का सवाल", text: "हल करें: 456 + 789 = ?" },
    { title: "गुणा का सवाल", text: "हल करें: 48 × 25 (वैदिक विधि से) = ?" },
    { title: "क्षेत्रफल", text: "एक आयत की लंबाई 12 सेमी व चौड़ाई 8 सेमी है। क्षेत्रफल व परिमाप ज्ञात करें।" },
    { title: "समीकरण", text: "हल करें: 3x + 7 = 28" },
    { title: "ज्यामिति", text: "एक समकोण त्रिभुज बनाएं और पाइथागोरस प्रमेय (a² + b² = c²) सत्यापित करें।" },
  ];
  const [activeProblemIdx, setActiveProblemIdx] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high DPI resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    drawBackground(ctx, rect.width, rect.height, gridMode);
  }, [gridMode]);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    mode: "grid" | "lines" | "blank"
  ) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (mode === "grid") {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 0.5;
      const gridSize = 24;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (mode === "lines") {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 0.8;
      const lineGap = 30;
      for (let y = 30; y <= height; y += lineGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineWidth = isEraser ? lineWidth * 4 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawBackground(ctx, rect.width, rect.height, gridMode);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "my-math-solution.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full font-heading text-sm mb-3">
          <BookCopy size={16} />
          <span>डिजिटल रफ़ नोटबुक व बोर्ड</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          गणित वर्कबुक और व्हाइटबोर्ड 📒
        </h1>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          पेंसिल, रबर, रंग और ग्रिड की सहायता से सीधे स्क्रीन पर सवाल हल करें या चित्र बनाएं!
        </p>
      </div>

      {/* Practice Question Card */}
      <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary">
            अभ्यास सवाल {activeProblemIdx + 1} / {practiceProblems.length}
          </span>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground mt-0.5">
            {practiceProblems[activeProblemIdx].text}
          </h2>
        </div>

        <button
          onClick={() =>
            setActiveProblemIdx((p) => (p + 1) % practiceProblems.length)
          }
          className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-heading text-xs px-4 py-2 rounded-xl font-bold transition"
        >
          अगला सवाल बदलें ❯
        </button>
      </div>

      {/* Whiteboard Controls Toolbar */}
      <div className="bg-card border-2 border-border rounded-3xl p-4 shadow-sm mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Tools: Pen vs Eraser */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsEraser(false)}
            className={`p-2.5 rounded-xl font-heading text-xs font-bold transition flex items-center gap-1.5 ${
              !isEraser
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <PenTool size={16} />
            <span>पेन</span>
          </button>
          <button
            onClick={() => setIsEraser(true)}
            className={`p-2.5 rounded-xl font-heading text-xs font-bold transition flex items-center gap-1.5 ${
              isEraser
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Eraser size={16} />
            <span>इरेज़र</span>
          </button>
        </div>

        {/* Color Palette */}
        {!isEraser && (
          <div className="flex items-center gap-2">
            {[
              "#1e293b", // Slate/Black
              "#2563eb", // Blue
              "#dc2626", // Red
              "#16a34a", // Green
              "#d97706", // Amber
              "#9333ea", // Purple
            ].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full transition-transform ${
                  color === c ? "scale-125 ring-2 ring-primary ring-offset-2" : "hover:scale-110"
                }`}
              />
            ))}
          </div>
        )}

        {/* Brush Size */}
        <div className="flex items-center gap-1.5">
          {[2, 4, 8].map((size) => (
            <button
              key={size}
              onClick={() => setLineWidth(size)}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold border transition ${
                lineWidth === size
                  ? "bg-muted font-black border-primary text-primary"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {size === 2 ? "बारीक" : size === 4 ? "मध्यम" : "मोटा"}
            </button>
          ))}
        </div>

        {/* Background Grid Pattern */}
        <div className="flex items-center gap-1.5">
          {(["grid", "lines", "blank"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setGridMode(m)}
              className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold border transition ${
                gridMode === m
                  ? "bg-muted border-primary text-primary"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {m === "grid" ? "खानें (Math)" : m === "lines" ? "लाइनें" : "कोरा"}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={clearBoard}
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-destructive text-xs font-heading font-bold transition flex items-center gap-1"
            title="Clear Board"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">मिटाएं</span>
          </button>
          <button
            onClick={downloadDrawing}
            className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-heading font-bold transition flex items-center gap-1 shadow"
            title="Download PNG"
          >
            <Download size={16} />
            <span className="hidden sm:inline">डाउनलोड</span>
          </button>
        </div>
      </div>

      {/* Digital Canvas */}
      <div className="bg-white rounded-3xl border-4 border-purple-200 dark:border-purple-900 shadow-xl overflow-hidden touch-none select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[520px] cursor-crosshair block"
        />
      </div>
    </div>
  );
};
