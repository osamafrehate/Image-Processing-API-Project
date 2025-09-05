import request from 'supertest'
import { app } from '../../index' 

describe('GET /', () => {
  it('should return the main endpoint', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
  
  it('should return the API title and description', async () => {
    const response = await request(app).get('/')
    expect(response.text).toMatch('Image Processing API')
  })
})