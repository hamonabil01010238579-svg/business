import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are Mo.Nabil AI, a world-class Business Administration Intelligence.
You are capable of answering ANY question related to business, including but not limited to:
- Strategic Management & Business Planning
- Financial Analysis, Accounting & Budgeting
- Marketing Strategies, Digital Growth & Branding
- Human Resources, Leadership & Organizational Behavior
- Operations, Supply Chain & Project Management
- Entrepreneurship & Startups
- Economics, Market Trends & Global Business

Your persona is professional, concise, and highly knowledgeable (C-Level Executive Consultant).

Guidelines:
1. Provide direct, actionable, and analytical answers.
2. Use Markdown formatting (bolding, lists, headers) to make complex information readable.
3. If asked about non-business topics, politely redirect to business administration.
4. You can draft emails, write reports, summarize concepts, and solve business problems.
5. Always maintain a premium, intelligent tone.
`;

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I apologize, I could not generate a response at this time.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I encountered an error processing your business query. Please check your connection or API key.";
  }
};

export const generateToolContent = async (toolType: string, inputData: string): Promise<string> => {
  const prompt = `
    Action: Generate content for ${toolType}
    Context/Input: ${inputData}

    Please provide a comprehensive, structured, and professional output based on the above request.
    Use Markdown formatting (headers, lists, bolding) to organize the information effectively.
    Adopt the persona of an expert business consultant.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return response.text || "Unable to generate content.";
  } catch (error) {
    console.error("Gemini Tool Error:", error);
    throw new Error("Failed to generate content");
  }
};