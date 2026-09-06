export type Language = "hi" | "en";

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  grade?: string;
  isGuest?: boolean;
  createdAt?: number;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  hint?: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  level: "beginner" | "intermediate" | "expert";
  topic: string;
  points: number;
  date: string;
}

export interface FormulaItem {
  name: string;
  formula: string;
}

export interface FormulaCategory {
  category: string;
  items: FormulaItem[];
}

export interface DefinitionItem {
  term: string;
  def: string;
}

export interface DefinitionCategory {
  category: string;
  items: DefinitionItem[];
}

export interface Mathematician {
  name: string;
  years: string;
  country: string;
  emoji: string;
  color: string;
  bg: string;
  title: string;
  born: string;
  died: string;
  education: string;
  about: string;
  contributions: { title: string; detail: string }[];
  quotes: string[];
  legacy: string;
  funFacts: string[];
}

export interface VedicSutra {
  no: number;
  sutra: string;
  meaning: string;
  color: string;
  bg: string;
  border: string;
  intro: string;
  uses: string[];
  steps: { label: string; text: string }[];
  why: string;
  practice: string;
  quiz: { q: string; options: string[]; ans: number }[];
}

export interface MathModel {
  no: number;
  name: string;
  category: string;
  level: string;
  time: string;
  color: string;
  visualDesc: string;
  lookLike: string;
  notLike: string;
  material: string;
  steps: string[];
  doNot: string[];
  concept: string;
}

export interface Model100Item {
  id: number;
  title: string;
  cat: string;
  class: string;
  diff: string;
  materials: string;
  emoji: string;
  working: string;
  concept: string;
}

export interface PatravachanTopic {
  no: number;
  type: string;
  title: string;
  level: string;
  duration: string;
  color: string;
  intro: string;
  points: string[];
  keyPoints: string[];
  doNot: string[];
  sampleLines: string;
}

export interface PatravachanDetail {
  title: string;
  type: string;
  level: string;
  duration: string;
  color: string;
  bgColor: string;
  preparation: string;
  fullScript: string;
  stageTips: string[];
  doList: string[];
  doNotList: string[];
  sampleOpening: string;
  sampleClosing: string;
  vocabulary: { word: string; meaning: string }[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  formula: string | null;
  category: string;
  class: string;
  en: string;
}

export interface LabExperiment {
  id: number;
  title: string;
  subtitle: string;
  level: string;
  emoji: string;
  color: string;
  description: string;
  interactive: boolean;
}

export interface SolverStep {
  label: string;
  content: string;
  formula?: string | null;
}

export interface SolverResponse {
  steps: SolverStep[];
  why: string;
  concept: string;
  error?: string;
  query?: string;
}
