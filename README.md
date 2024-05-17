
# Color Dropper

The Color Dropper is a web application that allows users to upload images and pick colors from them. Users can upload an image of their choice, and the application provides a color dropper tool to select colors directly from the uploaded image. This tool helps users accurately capture colors from images for various purposes, such as design, art, or analysis.


## Features

- **Image Upload**: Users can upload images to the canvas for further processing or analysis.

- **Adaptive Text Color**: The text color adapts based on the background color for optimal visibility. If the background is dark, the text becomes light, and vice versa.
  
- **Dynamic Circle Color**: The circle dynamically changes its color to match the color pointed to by the cursor.
 

## Getting Started

Instructions for setting up and running your project.

### Prerequisites

- Node.js version 20 or higher

1. Download and extract the project zip folder or git clone.
2. Navigate to the project directory:

   ```sh
   cd project-directory
3. Install the required packages:
    
      ```sh
       npm install
4. Run the project:
    
      ```sh
       npm start
   
### Solution 1: Canvas from Scratch
In this solution, the Color Dropper application utilizes the HTML5 canvas element to implement the color dropper functionality from scratch. The uploaded image is rendered onto the canvas, and users can interact with the canvas to select colors directly from the image. JavaScript is used to handle mouse events and extract color information from the canvas pixels. This solution offers a custom-built implementation that provides full control over the color picking process.

### Solution 2: Eyedropper API from Google
In this solution, the Color Dropper application leverages the Eyedropper API provided by Google. The Eyedropper API offers a convenient way to integrate color picking functionality into web applications without the need for manual implementation. Users can upload an image, and the Eyedropper API automatically detects and extracts colors from the image. This solution streamlines the development process by utilizing a pre-built API for color extraction, reducing development time and effort.