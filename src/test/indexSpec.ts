import request from 'supertest';
import { Response } from 'supertest';
import { app } from '../index';

describe('GET /', (): void => {
  it('should return the main endpoint with 200 status code', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should contain the API title and description', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.text).toContain('Image Processing API');
    expect(response.text).toContain('Resize images on the fly');
  });

  it('should list all available images', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.text).toContain('coastalsunset');
    expect(response.text).toContain('mountainretreat');
    expect(response.text).toContain('forestpathway');
  });
});