import express from 'express'
import routes from './routes/index'

export const app = express()
const port = 3000

export const availableImages = [
  'coastalsunset',
  'mountainretreat',
  'forestpathway'
]

app.get('/', (req, res) => {
  res.send(
   `<h1>Welcome to the Image Processing API</h1>
<p>This API is part of my portfolio projects. <br/><br/>
It resizes and saves images to user specifications when visiting a URL.<br/><br/>
Examples: 
<ul>
  <li>
    <span>If you want to see the resized image: </span>
    <a href='api/images?filename=coastalsunset&width=250&height=250'>
      api/images?filename=coastalsunset&width=250&height=250
    </a>
  </li>
</ul>
<p>Here is a list of available filenames: ${availableImages.join(', ')}</p>`
  )
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})