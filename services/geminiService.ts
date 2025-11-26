import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AuraResult } from "../types";

// Helper to get API key from various environment variable formats
// Supports:
// 1. process.env.API_KEY (Node/Webpack/System)
// 2. import.meta.env.VITE_API_KEY (Vite/Vercel Client-side)
const getApiKey = (): string => {
  const key = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;
  if (!key) {
    console.warn("API Key is missing. Please check your environment variables (API_KEY or VITE_API_KEY).");
  }
  return key || "";
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    vibeTitle: {
      type: Type.STRING,
      description: "사용자의 분위기를 나타내는 3-5단어의 짧고 트렌디한 한글 제목 (예: '나른한 오후의 햇살', '도심 속 힙스터', '청량한 여름 바람').",
    },
    auraColorHex: {
      type: Type.STRING,
      description: "분위기를 대표하는 헥스 컬러 코드 (예: #FF00FF).",
    },
    description: {
      type: Type.STRING,
      description: "사용자의 외모, 표정, 분위기를 토대로 한 재치있고 긍정적인 한글 평가. MBTI나 퍼스널 컬러 용어를 섞어서 20대가 좋아할 만한 톤앤매너로 작성.",
    },
    energyLevel: {
      type: Type.INTEGER,
      description: "1에서 100 사이의 에너지 레벨 정수.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "분위기에 어울리는 트렌디한 한글 해시태그 3개 (예: #감성충만).",
    },
    spiritEmoji: {
      type: Type.STRING,
      description: "분위기를 가장 잘 나타내는 이모지 1개.",
    },
  },
  required: ["vibeTitle", "auraColorHex", "description", "energyLevel", "hashtags", "spiritEmoji"],
};

export const analyzeAura = async (base64Image: string): Promise<AuraResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "이 사진 속 인물의 '분위기'와 '오라(Aura)'를 분석해줘. 한국의 2030 세대가 인스타그램에서 쓸법한 트렌디하고 감성적인 말투로 작성해줘. 칭찬을 베이스로 하되 재치있게 표현해줘.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "당신은 한국의 MZ세대 트렌드를 꿰뚫고 있는 AI 퍼스널 무드 분석가입니다. 친근하고 부드러운 '해요'체를 사용하세요.",
        temperature: 1.1,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AuraResult;
    }
    throw new Error("분석 결과를 생성하지 못했습니다.");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};