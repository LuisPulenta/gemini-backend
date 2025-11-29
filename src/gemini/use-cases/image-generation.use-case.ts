import { Content, ContentListUnion, createPartFromUri, GoogleGenAI, Modality } from '@google/genai';
import { ChatPromptDto } from '../dtos/chat-prompt.dto';
import { geminiUploadFiles } from '../helpers/gemini-upload-file';
import { ImageGenerationDto } from '../dtos/image-generation.dto';

import {v4 as uuidV4} from 'uuid';

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
  

  const contents: ContentListUnion = [
    {text: prompt}
  ]

  const uploadedFiles = await geminiUploadFiles(ai, files);

  uploadedFiles.forEach(file => {
    contents.push(createPartFromUri(file.uri ?? '', file.mimeType ?? ''));
  });

  const {
    model = 'gemini-2.0-flash-exp-image-generation',
  } = options ?? {};

  const response = await ai.models.generateContent({
    model:model,
    contents:contents,
    config:{
      responseModalities: [Modality.TEXT,Modality.IMAGE],
    }
  });

  console.log(response);

  let imageUrl = '';
  let text = '';
  const imageId = uuidV4();

  for (const part of response.candidates?.[0]?.content?.parts ?? []){
    if (part.text){
      text =part.text;
      continue;
    }
    if(!part.inlineData){
      continue;
    }
    const imageData = part.inlineData.data!;
    const buffer = Buffer.from(imageData,'base64');
    console.log(buffer);
  }
  console.log({text});

  return {
    imageUrl:'xyz',
    text:'ABC123',
  }
  
};
