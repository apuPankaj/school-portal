import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// The model we want to use
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

const SYSTEM_PROMPT = `
You are the official AI Assistant for Modern Public School (MPS) Balasore.
Your tone should be helpful, friendly, professional, and concise. 
If someone asks about admissions, tell them admissions are open and they can apply online or visit the campus.
If someone asks about the school, say MPS Balasore empowers young minds with quality education and values.
Do not make up specific dates or prices unless they are general knowledge. If you don't know the answer, politely say you don't have that information but they can contact the school at info@mpsbalasore.org or call +91-XXXXXXXXXX.
`;

export interface ChatMessage {
  text: string;
  isBot: boolean;
}

// Keep a simple conversation history in memory for context (optional, but good for follow-ups)
let conversationHistory: { role: string; parts: [{ text: string }] }[] = [];

export const generateChatResponse = async (message: string): Promise<string> => {
  if (!genAI || !model) {
    return "I'm sorry, my AI backend is not configured yet. Please check if the API key is set properly!";
  }

  try {
    // If starting fresh, include the system prompt as the first message context
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      });
      conversationHistory.push({
        role: "model",
        parts: [{ text: "Understood. I will act as the MPS AI Assistant." }]
      });
    }

    // Add user message to history
    conversationHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const chat = model.startChat({
      history: conversationHistory,
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Add model response to history
    conversationHistory.push({
      role: "model",
      parts: [{ text: response }]
    });

    return response;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I'm having trouble connecting to my servers right now. Please try again later.";
  }
};
