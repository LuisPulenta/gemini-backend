import { Content, createPartFromUri, GoogleGenAI } from '@google/genai';
import { ChatPromptDto } from '../dtos/chat-prompt.dto';
import { geminiUploadFiles } from '../helpers/gemini-upload-file';
import { ImageGenerationDto } from '../dtos/image-generation.dto';

interface Options {
  model?: string;
  system
  Instruction?: string;
}

export interface ImageGenerationResponse{
  imageUrl: string;
  text:string;
}

export const imageGenerationUseCase = async (
  ai: GoogleGenAI,
  imageGenerationDto: ImageGenerationDto,
  options?: Options,
):Promise<ImageGenerationResponse> => {
  const { prompt, files = [] } = imageGenerationDto;
  const uploadedFiles = await geminiUploadFiles(ai, files);

  // const {
  //   model = 'gemini-2.0-flash',
  //   systemInstruction = `
  //     Responde únicamente en español 
  //     En formato markdown 
  //     Usa negritas de esta forma __
  //     Usa el sistema métrico decimal
  // `,
  // } = options ?? {};

  return {
    imageUrl:'xyz',
    text:'ABC123',
  }
  
};
