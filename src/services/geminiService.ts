import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const getMoodRecommendation = async (mood: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a music expert. The user is feeling ${mood}. Suggest 5 songs (Title - Artist) that match this mood. Return the response as a bulleted list.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not fetch recommendations at this time.";
  }
};
