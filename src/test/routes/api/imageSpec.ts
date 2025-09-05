import request from 'supertest';
import { app } from '../../../index';
import fs from 'fs';
import resizeImage from '../../../utility/sharpResize';

describe('GET /api/images', () => {
  describe('valid image processing request', () => {
    it('should respond with a jpeg image for valid parameters', async () => {
      const response = await request(app).get(
        '/api/images?filename=coastalsunset&width=300&height=200'
      );
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });

    it('should create a resized image when processing for the first time', async () => {
      const filepath = './assets/images/thumb/coastalsunset-250x250.jpg';
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      
      await resizeImage('coastalsunset', 250, 250);
      expect(fs.existsSync(filepath)).toBeTruthy();
      
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    });
  });

  describe('invalid image processing requests', () => {
    it('should respond with 404 for non-existent image', async () => {
      const response = await request(app).get(
        '/api/images?filename=nonexistent&width=250&height=250'
      );
      expect(response.status).toBe(404);
    });

    it('should respond with 400 for invalid dimensions', async () => {
      const response = await request(app).get(
        '/api/images?filename=coastalsunset&width=abc&height=def'
      );
      expect(response.status).toBe(400);
    });

    it('should respond with 400 for negative dimensions', async () => {
      const response = await request(app).get(
        '/api/images?filename=coastalsunset&width=-100&height=-200'
      );
      expect(response.status).toBe(400);
    });

    it('should respond with 400 for zero dimensions', async () => {
      const response = await request(app).get(
        '/api/images?filename=coastalsunset&width=0&height=0'
      );
      expect(response.status).toBe(400);
    });
  });
});