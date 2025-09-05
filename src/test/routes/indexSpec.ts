import request from 'supertest';
import type { Response } from 'supertest';
import { app } from '../../index';

describe('GET /', (): void => {
  it('should return the main endpoint with 200 status code', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should contain the API title in the response', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.text).toContain('Image Processing API');
  });

  it('should list all available images', async (): Promise<void> => {
    const response: Response = await request(app).get('/');
    expect(response.text).toContain('coastalsunset');
    expect(response.text).toContain('mountainretreat');
    expect(response.text).toContain('forestpathway');
  });
});

describe('GET /api', (): void => {
  it('should return the API endpoint with 200 status code', async (): Promise<void> => {
    const response: Response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });

  it('should return JSON response with API information', async (): Promise<void> => {
    const response: Response = await request(app).get('/api');
    
    expect(response.header['content-type']).toMatch(/json/);
    
    expect(response.body).toEqual(jasmine.objectContaining({
      message: jasmine.any(String),
      version: jasmine.any(String),
      endpoints: jasmine.any(Object),
      example: jasmine.any(String)
    }));
  });
});