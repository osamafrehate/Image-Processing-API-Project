import express, { Router, Request, Response } from 'express';
import path from 'path';
import { availableImages } from '../../index';
import resizeImage from '../../utility/sharpResize';
import fs from 'fs';

const images: Router = express.Router();

async function processImageRequest(req: Request, res: Response): Promise<void> {
  try {
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const filename: string = req.query.filename as string;

    if (!filename || !availableImages.includes(filename)) {
      res.status(404).json({
        error: 'Image not found',
        message: 'Please provide a valid filename',
        availableImages: availableImages,
        example: '/api/images?filename=coastalsunset&width=400&height=300'
      });
      return;
    }

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      res.status(400).json({
        error: 'Invalid dimensions',
        message: 'Width and height must be positive numbers',
        example: '/api/images?filename=coastalsunset&width=400&height=300'
      });
      return;
    }

    const thumbDir: string = path.resolve(__dirname, '../../../assets/images/thumb');
    const thumbPath: string = path.join(thumbDir, `${filename}-${width}x${height}.jpg`);

    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    if (!fs.existsSync(thumbPath)) {
      await resizeImage(filename, height, width);
    }

    res.sendFile(thumbPath);

  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process image. Please try again later.'
    });
  }
}

images.get('/', processImageRequest);

export default images;