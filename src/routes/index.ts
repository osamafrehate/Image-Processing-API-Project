import express, { Router, Request, Response } from 'express';
import images from './api/image';

const routes: Router = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.json({
    message: ' Image Processing API',
    version: '1.0.0',
    endpoints: {
      resize_image: '/api/images?filename={name}&width={number}&height={number}',
      available_images: ['coastalsunset', 'mountainretreat', 'forestpathway']
    },
    example: '/api/images?filename=coastalsunset&width=400&height=300'
  });
});

routes.use('/images', images);

export default routes;