import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const scriptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      description: "Analysis of the original viral script.",
      properties: {
        hookStrategy: { type: Type.STRING, description: "The specific technique used in the first 5-10 seconds (e.g., 'Pattern Interrupt', 'Curiosity Gap')." },
        pacing: { type: Type.STRING, description: "Description of the speed, editing rhythm, and flow (e.g., 'Fast cuts every 2s')." },
        emotionalTriggers: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Key emotions evoked (e.g., curiosity, anger, inspiration)."
        },
        structureBreakdown: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Step-by-step breakdown of the narrative arc (e.g., Hook -> Conflict -> Twist -> Resolution)."
        },
        whyItWorked: { type: Type.STRING, description: "A summary of why this specific script went viral." }
      },
      required: ["hookStrategy", "pacing", "emotionalTriggers", "structureBreakdown", "whyItWorked"]
    },
    newScript: {
      type: Type.OBJECT,
      description: "The newly generated script based on the original structure but for the new topic.",
      properties: {
        title: { type: Type.STRING, description: "A click-baity, viral-style YouTube title." },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sectionName: { type: Type.STRING, description: "e.g., Intro, Body Point 1, Climax" },
              content: { type: Type.STRING, description: "The spoken script (voiceover). MUST be in Korean." },
              visualCue: { type: Type.STRING, description: "Instructions for B-roll, editing, or on-screen text." },
              estimatedDuration: { type: Type.STRING, description: "Estimated time for this section (e.g., '0:00-0:15')" }
            },
            required: ["sectionName", "content", "visualCue", "estimatedDuration"]
          }
        }
      },
      required: ["title", "sections"]
    }
  },
  required: ["analysis", "newScript"]
};

export const generateViralScript = async (originalScript: string, newTopic: string): Promise<GeneratedResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Using multipart content is safer and clearer for the model
    const parts = [
      { text: `ROLE: You are an expert Viral YouTube Script Consultant.
GOAL: Clone the *success formula* of a viral video by extracting its underlying structure and applying it to a new topic.

STRICT INSTRUCTIONS:
1. ANALYZE: Deeply dissect the [ORIGINAL SCRIPT].
   - Identify the Hook logic (Question? Shock? Story?).
   - Map the Pacing (How fast does it move?).
   - Trace the Narrative Arc (Beat-by-beat).

2. CLONE & WRITE: Create a [NEW SCRIPT] for the [NEW TOPIC].
   - **Structure Mapping**: If the original has a joke at 10s, the new one MUST have a joke (related to the new topic) at 10s. If the original asks a rhetorical question at the end, the new one MUST do the same.
   - **Tone**: Match the energy (High energy? Serious? Sarcastic?).
   - **Language**: Korean (Hangul). Natural, spoken YouTube style.
   - **Visuals**: Provide specific editing instructions similar to the original's style.` },
      { text: `[ORIGINAL SCRIPT TO ANALYZE]:\n"""${originalScript}"""` },
      { text: `[NEW TOPIC TO WRITE ABOUT]:\n"""${newTopic}"""` }
    ];

    const response = await genAI.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: scriptSchema,
        temperature: 0.7,
      }
    });

    if (!response.text) {
      throw new Error("No response generated from Gemini.");
    }

    return JSON.parse(response.text) as GeneratedResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};