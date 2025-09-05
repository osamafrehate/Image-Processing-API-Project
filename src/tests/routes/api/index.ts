import request from 'supertest'
import { app } from '../../../index' 

describe('GET /api', () => {
  it('should return the API endpoint successfully', async () => {
    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
  })
})