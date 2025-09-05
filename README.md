# Image Processing API

A simple **TypeScript** API built with **Express** for dynamically resizing images on the fly. The API allows users to fetch resized versions of available images by specifying width and height.

---

## Features

- Resize images dynamically using **Sharp**.
- Returns images in JPEG format.
- Handles invalid filenames or dimensions gracefully.
- Includes unit tests using **Supertest** and **Jasmine**.
- Fully written in **TypeScript**.

---

## Available Images

The API comes with the following sample images:

- `coastalsunset`
- `mountainretreat`
- `forestpathway`
### Languages
- **TypeScript** – All project files are written in TypeScript, including core logic, routes, and tests.
- **JavaScript** – Only legacy code (before converting to TypeScript), now fully migrated.
- **HTML** – For the main page showing example usage and available images.

### Technologies
- **Node.js** – Runtime environment for executing the project.
- **Express** – Web framework for building RESTful API and handling routes.
- **Sharp** – Image processing library to dynamically resize images.
- **FS (File System)** – For file handling: creating directories, checking existence, and saving images.
- **Path** – For safely handling file paths across different systems.

### Unit Testing
- **Jasmine** – Testing framework for unit tests.
- **Supertest** – HTTP testing library to simulate API requests and verify responses.

### Tools & Utilities
- **ts-node / TypeScript compiler** – To run TypeScript files directly.
- **npm** – For package management.
