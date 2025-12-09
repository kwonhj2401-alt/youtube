export interface ScriptSection {
  sectionName: string;
  content: string;
  visualCue: string;
  estimatedDuration: string;
}

export interface ViralAnalysis {
  hookStrategy: string;
  pacing: string;
  emotionalTriggers: string[];
  structureBreakdown: string[];
  whyItWorked: string;
}

export interface GeneratedResult {
  analysis: ViralAnalysis;
  newScript: {
    title: string;
    sections: ScriptSection[];
  };
}

export interface ScriptFormData {
  originalScript: string;
  newTopic: string;
}