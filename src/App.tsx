import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { BottomNav } from "./components/BottomNav";

// Import all pages from script-2.js
import { HomePage } from "./pages/HomePage";
import { ClassesPage } from "./pages/ClassesPage";
import { ClassDetailPage } from "./pages/ClassDetailPage";
import { TablesPage } from "./pages/TablesPage";
import { SquaresCubesPage } from "./pages/SquaresCubesPage";
import { FormulasPage } from "./pages/FormulasPage";
import { DefinitionsPage } from "./pages/DefinitionsPage";
import { GamesPage } from "./pages/GamesPage";
import { QuizPage } from "./pages/QuizPage";
import { DailyChallengePage } from "./pages/DailyChallengePage";
import { WorkbookPage } from "./pages/WorkbookPage";
import { WorksheetsPage } from "./pages/WorksheetsPage";
import { MathematiciansPage } from "./pages/MathematiciansPage";
import { VedicMathPage } from "./pages/VedicMathPage";
import { MathTricksPage } from "./pages/MathTricksPage";
import { ModelsPage } from "./pages/ModelsPage";
import { InteractiveModelsPage } from "./pages/InteractiveModelsPage";
import { MathModels100Page } from "./pages/MathModels100Page";
import { PatravachanPage } from "./pages/PatravachanPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { AiSolverPage } from "./pages/AiSolverPage";
import { ChatPage } from "./pages/ChatPage";
import { VirtualLabPage } from "./pages/VirtualLabPage";
import { GeneralMathPage } from "./pages/GeneralMathPage";
import { ProgressPage } from "./pages/ProgressPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { HelpSupportPage } from "./pages/HelpSupportPage";
import { LoginPage } from "./pages/LoginPage";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-center py-3 px-4 select-none print:hidden mb-16 md:mb-0"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        background:
          "linear-gradient(90deg, hsl(271,76%,53%,0.08), hsl(32,98%,58%,0.08), hsl(271,76%,53%,0.08))",
        borderTop: "3px dashed hsl(var(--border))",
      }}
    >
      <p className="text-sm text-muted-foreground font-body">
        🔢 NKG MATH UNIVERSE © 2026 | गणित सीखो, मज़े करो! 🎉
      </p>
    </footer>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
          <Navbar />

          {/* Main View Area */}
          <main className="flex-1 pb-6 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/classes/:classId" element={<ClassDetailPage />} />
              <Route path="/class/:classId" element={<ClassDetailPage />} />
              <Route path="/tables" element={<TablesPage />} />
              <Route path="/squares-cubes" element={<SquaresCubesPage />} />
              <Route path="/formulas" element={<FormulasPage />} />
              <Route path="/definitions" element={<DefinitionsPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/daily-challenge" element={<DailyChallengePage />} />
              <Route path="/workbook" element={<WorkbookPage />} />
              <Route path="/worksheets" element={<WorksheetsPage />} />
              <Route path="/mathematicians" element={<MathematiciansPage />} />
              <Route path="/vedic-math" element={<VedicMathPage />} />
              <Route path="/vedic" element={<VedicMathPage />} />
              <Route path="/tricks" element={<MathTricksPage />} />
              <Route path="/math-tricks" element={<MathTricksPage />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/math-models" element={<ModelsPage />} />
              <Route path="/interactive-models" element={<InteractiveModelsPage />} />
              <Route path="/math-models-100" element={<MathModels100Page />} />
              <Route path="/patravachan" element={<PatravachanPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/ai-solver" element={<AiSolverPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/study-companion" element={<ChatPage />} />
              <Route path="/virtual-lab" element={<VirtualLabPage />} />
              <Route path="/general-math" element={<GeneralMathPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/help-support" element={<HelpSupportPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>

          <Footer />
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
