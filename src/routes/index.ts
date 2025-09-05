import express from 'express'
import images from './api/image'
const routes = express.Router()

routes.get('/', (req, res) => {
  res.send("<p>Image Processing API - Use /images endpoint to process images</p>")
})

routes.use('/images', images)

export default routes