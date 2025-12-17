import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a short, simple rhyme in Portuguese for a 4-year-old
 * based on the context provided.
 */
export const generateKidsRhyme = async (context: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Você é um assistente gentil para crianças de 4 anos.
    Escreva uma rima muito curta (máximo 2 linhas), simples e divertida em Português do Brasil sobre: ${context}.
    Use emojis. Não use palavras difíceis.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "A romã é vermelhinha e docinha! 🍎";
  } catch (error) {
    console.error("Erro ao gerar rima:", error);
    return "Que legal! Você descobriu algo novo sobre a romã! ✨";
  }
};

/**
 * Generates a simple, magical answer for a 4-year-old's question.
 */
export const generateChildAnswer = async (question: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Você é um professor de jardim de infância carinhoso e criativo. 
    Responda a seguinte pergunta de uma criança de 4 anos sobre a Romã: "${question}".
    A resposta deve ser curta (máximo 2 frases), mágica, fácil de entender e usar emojis.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Essa é uma ótima pergunta! A romã é cheia de mistérios mágicos. ✨";
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);
    return "A natureza tem segredos incríveis! Vamos descobrir juntos? 🌿";
  }
};