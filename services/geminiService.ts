
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function searchGames(query: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Search for video games matching: "${query}". Provide metadata suitable for a library manager.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            igdbId: { type: Type.STRING },
            title: { type: Type.STRING },
            platform: { type: Type.STRING },
            releaseYear: { type: Type.NUMBER },
            description: { type: Type.STRING },
            coverUrl: { type: Type.STRING },
          },
          required: ["igdbId", "title", "platform", "releaseYear", "coverUrl"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
}

export async function parseLocalFiles(fileList: string[]) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify these potential game files/folders and map them to real game titles and platforms: ${fileList.join(', ')}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            originalName: { type: Type.STRING },
            identifiedTitle: { type: Type.STRING },
            identifiedPlatform: { type: Type.STRING },
            matchConfidence: { type: Type.NUMBER }
          },
          required: ["originalName", "identifiedTitle", "identifiedPlatform"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse local file identification", e);
    return [];
  }
}
