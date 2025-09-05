"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharpResize_1 = __importDefault(require("../../utility/sharpResize"));
const index_1 = require("../../index");
const fs_1 = __importDefault(require("fs"));
const images = express_1.default.Router();
function processImageRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        const filename = req.query.filename;
        if (filename === undefined || !index_1.availableImages.includes(filename)) {
            res.status(404);
            res.send(`<h2>Image not found</h2><p>Please enter a valid filename from the following list : ${index_1.availableImages}</p>`);
        }
        else if (isNaN(width) || isNaN(height)) {
            res.status(400);
            res.send("<h2>Invalid width or height</h2><p>Please enter valid numeric values for width and height.</p>");
        }
        else if (index_1.availableImages.includes(filename) && !isNaN(width) && !isNaN(height)) {
            if (!fs_1.default.existsSync(`${path_1.default.resolve(__dirname, `../../../assets/images/`)}/thumb/${filename}-${width}x${height}.jpg`)) {
                yield (0, sharpResize_1.default)(filename, height, width);
            }
            res.sendFile(`${path_1.default.resolve(__dirname, `../../../assets/images/`)}/thumb/${filename}-${width}x${height}.jpg`);
        }
    });
}
images.get('/', processImageRequest);
exports.default = images;
