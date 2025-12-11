import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// System instruction based on the project document
const SYSTEM_INSTRUCTION = `
你是一个计算机视觉和路面养护领域的专家助手。你正在帮助一名学生完成关于"面向路面养护的裂纹自动分割方法设计与实现"的项目。

项目背景：
- 随着城市化，道路裂缝成为主要维护问题。
- 传统人工巡检效率低、危险高。
- 利用计算机视觉（Deep Learning/Machine Learning）实现自动化检测是趋势。

数据集信息 (DeepCrack)：
- 包含537张RGB图像（训练集300，测试集237）。
- 标注：二进制掩码（白色为裂纹，黑色为背景）。
- 特点：极度不平衡（裂纹仅占1-5%），背景复杂（阴影、油污），特征细微。

方法论：
- 传统方法：阈值分割、Frangi滤波、形态学后处理。
- 深度学习：U-Net, Transformer, DeepLabV3+。
- 评估指标：IoU, Dice Coefficient, F1 Score。

你的任务是回答用户关于该项目的技术问题、代码实现思路、论文写作建议或数学原理。回答要专业、简洁且有条理。
`;

class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  public async startChat() {
    try {
      this.chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  }

  public async sendMessage(message: string): Promise<string> {
    if (!API_KEY) {
        return "请配置 API_KEY 环境变量以使用 AI 助手功能。";
    }

    if (!this.chat) {
      await this.startChat();
    }

    if (!this.chat) {
        return "聊天初始化失败。";
    }

    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "抱歉，我无法生成回复。";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "抱歉，处理您的请求时出现错误。请稍后再试。";
    }
  }
}

export const geminiService = new GeminiService();