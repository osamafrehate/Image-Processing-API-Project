import express, { Request, Response } from 'express'
import path from 'path'
import resizeImage from '../../utility/sharpResize'
import { availableImages } from '../../index'
import fs from 'fs'

const images = express.Router()

async function processImageRequest(req: Request, res: Response): Promise<void> {
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)
  const filename = req.query.filename as string

  if (filename === undefined || !availableImages.includes(filename)) {
    res.status(404)
    res.send(
      `<h2>Image not found</h2><p>Please enter a valid filename from the following list : ${availableImages}</p>`
    )
  } else if (isNaN(width) || isNaN(height)) {
    res.status(400)
    res.send(
      "<h2>Invalid width or height</h2><p>Please enter valid numeric values for width and height.</p>"
    )
  } else if (availableImages.includes(filename) && !isNaN(width) && !isNaN(height)) {
    if (
      !fs.existsSync(
        `${path.resolve(
          __dirname,
          `../../../assets/images/`
        )}/thumb/${filename}-${width}x${height}.jpg`
      )
    ) {
      await resizeImage(filename, height, width)
    }
    res.sendFile(
      `${path.resolve(
        __dirname,
        `../../../assets/images/`
      )}/thumb/${filename}-${width}x${height}.jpg`
    )
  }
}

images.get('/', processImageRequest)

export default images