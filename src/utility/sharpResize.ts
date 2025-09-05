import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const resizeImage = async (
  filename: string,
  height: number,
  width: number
): Promise<void> => {
  try {
    const inputPath: string = path.resolve(
      __dirname, 
      '../../assets/images/full', 
      `${filename}.jpg`
    );
    
    const outputDir: string = path.resolve(
      __dirname, 
      '../../assets/images/thumb'
    );
    
    const outputPath: string = path.join(
      outputDir, 
      `${filename}-${width}x${height}.jpg`
    );

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input image not found: ${inputPath}`);
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true
      })
      .jpeg({ 
        quality: 90,
        mozjpeg: true
      })
      .toFile(outputPath);

    console.log(` Image successfully resized: ${outputPath}`);

  } catch (error) {
    console.error(' Sharp resize error:', error);
    throw new Error(`Failed to resize image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default resizeImage;