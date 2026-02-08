/**
 * Bitarr IGDB Service
 * Handles direct communication with Twitch/IGDB APIs
 */

export interface IGDBGame {
  id: string;
  name: string;
  summary: string;
  first_release_date: number;
  cover?: { url: string };
  platforms?: { name: string }[];
}

export async function searchIGDB(query: string, clientId: string, clientSecret: string) {
  // In a real production app, the token exchange should happen on a secure backend.
  // This simulation shows how the direct integration works.
  console.log(`Searching IGDB for: ${query}`);
  
  // Simulated IGDB Response to avoid CORS/Auth errors in this demo environment
  // In a real deployment, this would use fetch('https://api.igdb.com/v4/games')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          igdbId: "igdb-" + Math.random().toString(36).substr(2, 9),
          title: query.charAt(0).toUpperCase() + query.slice(1),
          platform: "Multiple Platforms",
          releaseYear: 2023,
          description: "An epic adventure found via direct IGDB metadata scraping.",
          coverUrl: `https://picsum.photos/seed/${query}/300/400`,
        },
        {
          igdbId: "igdb-" + Math.random().toString(36).substr(2, 9),
          title: query + " II: The Sequel",
          platform: "PC / Switch",
          releaseYear: 2024,
          description: "The direct sequel to the critically acclaimed masterpiece.",
          coverUrl: `https://picsum.photos/seed/${query}2/300/400`,
        }
      ]);
    }, 800);
  });
}

/**
 * Normalizes messy folder names for better matching
 */
export function normalizeFileName(fileName: string): string {
  return fileName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[._-]/g, " ")   // Replace dots, underscores, dashes with spaces
    .replace(/\(.*?\)/g, "")   // Remove anything in parentheses
    .replace(/\[.*?\]/g, "")   // Remove anything in brackets
    .trim();
}

export async function matchLocalFiles(fileList: string[]) {
  return fileList.map(file => {
    const cleaned = normalizeFileName(file);
    return {
      originalName: file,
      identifiedTitle: cleaned,
      identifiedPlatform: "Auto-Detect",
      matchConfidence: 0.85
    };
  });
}