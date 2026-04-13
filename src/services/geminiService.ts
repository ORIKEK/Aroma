import { GoogleGenAI, Type } from "@google/genai";
import { Discovery, Formula, RareIngredient, Substitute } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are a Professor of Aroma Chemistry and Scent Historian specializing in Agarbatti (Incense) and Attar (Perfume oil).
Your goal is to provide deep, scholarly, and professional-grade aroma knowledge.
Focus specifically on Indian and Middle Eastern fragrance traditions, ancient secrets, and modern chemical engineering.
When providing formulas, include 'Molecular Interactions' (how chemicals react with each other).
Search for 'Industry Secrets'—specific tricks used by big perfume houses to make scents last longer or smell 'expensive.'
Always include precise chemical names and exact ratios.`;

export async function generateFormula(query: string): Promise<Formula> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a professional Agarbatti or Attar formula for: ${query}.
    Provide a massive, scholarly response including:
    1. A precise formula with ratios and 'Molecular Interactions'.
    2. A section on Raw Material quality/grades (Raw Material Mastery). Explain the difference between cheap industrial grade and high-quality perfumery grade, and how to make cheap ones smell better.
    3. A specific Maturation Time (days/weeks).
    4. Technical details (temperature, mixing order, stability, and Industry Secrets).
    5. 'Experimental Secrets': What happens if the ratio is changed slightly (The Iceberg Rule).
    6. A 'Knowledge Essay' (minimum 300 words) covering history (especially in India and the Middle East), chemical properties, and the soul of the ingredients.
    7. 'Market Edge': A small tip on how to sell this specific scent to make a high profit with low-cost materials.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                ratio: { type: Type.NUMBER }
              },
              required: ["name", "ratio"]
            }
          },
          rawMaterials: { type: Type.STRING },
          rawMaterialMastery: { type: Type.STRING },
          maturationTime: { type: Type.STRING },
          technicalDetails: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          experimentalSecrets: { type: Type.STRING },
          knowledgeEssay: { type: Type.STRING },
          marketEdge: { type: Type.STRING }
        },
        required: ["name", "ingredients", "rawMaterials", "rawMaterialMastery", "maturationTime", "technicalDetails", "experimentalSecrets", "knowledgeEssay", "marketEdge"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  };
}

export async function getDailyRareIngredient(): Promise<RareIngredient> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Pick one rare aroma ingredient (like Oud, Mysore Sandalwood, Ambergris, etc.) and provide a 3-line breakdown of why it is special.",
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          breakdown: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3
          }
        },
        required: ["name", "breakdown"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    id: crypto.randomUUID()
  };
}

export async function getDiscoveries(): Promise<Discovery[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate 5 recent (simulated) discoveries in aroma chemistry, new synthetic molecules, or fragrance industry updates. Make them sound professional and technical.",
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            date: { type: Type.STRING }
          },
          required: ["title", "content", "date"]
        }
      }
    }
  });

  const data = JSON.parse(response.text || "[]");
  return data.map((d: any) => ({
    ...d,
    id: crypto.randomUUID()
  }));
}

export async function getSubstitute(ingredient: string): Promise<Substitute> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Act as a Cost-Cutting Chemist for the Agarbatti and Attar industry. Suggest a budget-friendly substitution for: ${ingredient}. Provide 2-3 affordable aroma chemicals or cheaper oils that create a similar accord. Include a short mixing tip (max 10 words).`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          expensiveIngredient: { type: Type.STRING },
          budgetMix: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 2,
            maxItems: 3
          },
          mixingTip: { type: Type.STRING }
        },
        required: ["expensiveIngredient", "budgetMix", "mixingTip"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    id: crypto.randomUUID()
  };
}
