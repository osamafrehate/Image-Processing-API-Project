"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableImages = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.availableImages = [
    'coastalsunset',
    'mountainretreat',
    'forestpathway'
];
exports.app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Image Processing API</h1>
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
<p>Here is a list of available filenames: ${exports.availableImages.join(', ')}</p>`);
});
exports.app.use('/api', index_1.default);
exports.app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
