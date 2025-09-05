import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export default async function resizeImage(
  filename: string,
  height: number,
  width: number
): Promise<string> {
  const inputPath = path.resolve(__dirname, '../../assets/images/full', `${filename}.jpg`);
  const outputDir = path.resolve(__dirname, '../../assets/images/thumb');
  const outputPath = path.join(outputDir, `${filename}-${width}x${height}.jpg`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    throw new Error(`Failed to process image: ${error}`);
  }
}