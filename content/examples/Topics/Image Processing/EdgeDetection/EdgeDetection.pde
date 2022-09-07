/**
 * Edge Detection.
 *
 * This program analyzes every pixel in an image and compares it with thee
 * neighboring pixels to identify edges.
 *
 * This is an example of an "image convolution" using a kernel (small matrix)
 * to analyze and transform a pixel based on the values of its neighbors.
 *
 * This kernel describes a "Laplacian Edge Detector".  It is effective,
 * but sensitive to noise.  One common enhancement is to add a Gaussian
 * blur to the source image first, as in
 *   grayImg.filter(BLUR);
 * to reduce impact of noise on the output.  The combination is often called
 * "Laplace of Gaussian", or "LoG" for short.
 *
 * For weaker detection effect, try this kernel:     [  0  -1   0 ]
 *                                                   [ -1   4  -1 ]
 *                                                   [  0  -1   0 ]
 */

float[][] kernel = {{ -1, -1, -1},
                    { -1,  8, -1},
                    { -1, -1, -1}};

PImage img;

void setup() {
  size(640, 360);
  img = loadImage("moon.jpg"); // Load the original image
  noLoop();
}

void draw() {
  image(img, 0, 0); // Displays the image from point (0,0)
  img.loadPixels();

  // Edge detection should be done on a grayscale image.
  //  Create a copy of the source image, and convert to gray.
  PImage grayImg = img.copy();
  grayImg.filter(GRAY);
  // grayImg.filter(BLUR);

  // Create an opaque image of the same size as the original
  PImage edgeImg = createImage(grayImg.width, grayImg.height, RGB);

  // Loop through every pixel in the image
  for (int y = 1; y < grayImg.height-1; y++) {   // Skip top and bottom edges
    for (int x = 1; x < grayImg.width-1; x++) {  // Skip left and right edges
      // Output of this filter is shown as offset from 50% gray.
      // This preserves transitions from low (dark) to high (light) value.
      // Starting from zero will show only high edges on black instead.
      float sum = 128;
      for (int ky = -1; ky <= 1; ky++) {
        for (int kx = -1; kx <= 1; kx++) {
          // Calculate the adjacent pixel for this kernel point
          int pos = (y + ky)*grayImg.width + (x + kx);

          // Image is grayscale, red/green/blue are identical
          float val = blue(grayImg.pixels[pos]);
          // Multiply adjacent pixels based on the kernel values
          sum += kernel[ky+1][kx+1] * val;
        }
      }
      // For this pixel in the new image, set the output value
      // based on the sum from the kernel
      edgeImg.pixels[y*edgeImg.width + x] = color(sum);
    }
  }
  // State that there are changes to edgeImg.pixels[]
  edgeImg.updatePixels();

  image(edgeImg, width/2, 0); // Draw the new image
}
