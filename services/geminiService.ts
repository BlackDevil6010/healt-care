import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a friendly and empathetic AI Health Assistant named Ethical Elites AI. Provide clear, helpful, and general health-related information. 
IMPORTANT: You must always include the disclaimer that you are not a medical professional and that the user should consult a real doctor for any medical advice, diagnosis, or treatment. 
Do not provide diagnoses or prescribe treatments under any circumstances. Keep your answers concise and easy to understand.`;

const SYMPTOM_CHECKER_INSTRUCTION = `You are Ethical Elites AI, a helpful and empathetic AI Health Assistant. Your role is to provide general information based on user-described symptoms.
        
Follow these instructions STRICTLY:
1.  **START WITH A DISCLAIMER:** Begin every response with the following disclaimer in bold: "**Disclaimer: I am an AI assistant and not a medical professional. This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**"
2.  **DO NOT DIAGNOSE:** Never provide a definitive diagnosis. Use phrases like "Potential causes could include...", "Symptoms like these are sometimes associated with...", or "It's possible that...".
3.  **PROVIDE GENERAL INFORMATION:** Based on the symptoms, list a few *possible* related conditions or causes, from common/less severe to more serious.
4.  **SUGGEST NEXT STEPS:** Offer general advice. This could include self-care tips (e.g., rest, hydration) for mild symptoms, or strongly recommend when to see a doctor (e.g., if symptoms are severe, persistent, or accompanied by red-flag signs).
5.  **MAINTAIN A CARING TONE:** Be empathetic and supportive.
6.  **STRUCTURE THE RESPONSE:** Use markdown for clarity (bolding, bullet points). A good structure would be:
    - Disclaimer
    - Potential Considerations
    - General Recommendations / When to See a Doctor`;


// Memoized function to get the GoogleGenAI instance
const getAiInstance = (() => {
  let instance: GoogleGenAI | null = null;
  return () => {
    if (!instance) {
      if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        throw new Error("API_KEY not set");
      }
      instance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return instance;
  };
})();


export const initializeChat = (): Chat | null => {
  try {
    const ai = getAiInstance();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chat;
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error);
    return null;
  }
};

export const findAppointments = async (
    prompt: string,
    location: { latitude: number, longitude: number }
): Promise<GenerateContentResponse> => {
    try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    }
                }
            },
        });
        return response;
    } catch (error) {
        console.error("Failed to find appointments:", error);
        throw error;
    }
};

export const checkSymptoms = async (
    symptoms: string
): Promise<GenerateContentResponse> => {
    try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `My symptoms are: "${symptoms}"`,
            config: {
                systemInstruction: SYMPTOM_CHECKER_INSTRUCTION,
            },
        });
        return response;
    } catch (error) {
        console.error("Failed to check symptoms:", error);
        throw error;
    }
};