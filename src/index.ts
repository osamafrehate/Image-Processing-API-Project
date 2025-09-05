import express, { Request, Response } from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

export const availableImages: string[] = [
  'coastalsunset',
  'mountainretreat',
  'forestpathway'
];

app.get('/', (req: Request, res: Response): void => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Image Processing API</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        .example { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>Image Processing API</h1>
      <p>Resize images on the fly with this API</p>
      
      <div class="example">
        <h3>Example:</h3>
        <a href="/api/images?filename=coastalsunset&width=400&height=300">
          /api/images?filename=coastalsunset&width=400&height=300
        </a>
      </div>

      <h3>Available Images:</h3>
      <ul>
        ${availableImages.map(image => `<li>${image}</li>`).join('')}
      </ul>
    </body>
    </html>
  `);
});

app.use('/api', routes);

app.listen(port, (): void => {
  console.log(` Server running at http://localhost:${port}`);
});
export { app };
export default app;