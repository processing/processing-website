/**
 * Blur.
 *
 * This program analyzes every pixel in an image and blends it with the
 * neighboring pixels to blur the image.
 *
 * This is an example of an "image convolution" using a kernel (small matrix)
 * to analyze and transform a pixel based on the values of its neighbors.
 *
 * Image blur is also called a "low-pass filter".  Pixels of low frequency
 * change (similar brightness as neighbors) are left mostly unchanged, while
 * those with high frequency change (sharply different values) are smoothed
 * out.
 *
 * The kernel here is a Box Blur, in which all components are equally valued.
 * Another common blur is "Gaussian Blur", in which pixels nearer the center
 * of the kernel have more weight than those further away.
 *
 * An example 3x3 Gaussian kernel might be:          [ 1  2  1 ]
 *                                            1/16 * [ 2  4  2 ]
 *                                                   [ 1  2  1 ]
 *
 * An example 5x5 kernel, which creates a greater blur effect:
 *                                                   [ 1   4   6   4  1 ]
 *                                                   [ 4  16  24  16  4 ]
 *                                           1/256 * [ 6  24  36  24  6 ]
 *                                                   [ 4  16  24  16  4 ]
 *                                                   [ 1   4   6   4  1 ]
 */

float v = 1.0 / 9.0;
float[][] kernel = {{ v, v, v },
                    { v, v, v },
                    { v, v, v }};

PImage img;

void setup() {
  size(640, 360);
  img = loadImage("moon.jpg"); // Load the original image
  noLoop();
}

void draw() {
  image(img, 0, 0); // Displays the image from point (0,0)
  img.loadPixels();

  // Create an opaque image of the same size as the original
  PImage blurImg = createImage(img.width, img.height, RGB);

  // Loop through every pixel in the image
  for (int y = 1; y < img.height-1; y++) {   // Skip top and bottom edges
    for (int x = 1; x < img.width-1; x++) {  // Skip left and right edges
      float sumRed = 0;   // Kernel sums for this pixel
      float sumGreen = 0;
      float sumBlue = 0;
      for (int ky = -1; ky <= 1; ky++) {
        for (int kx = -1; kx <= 1; kx++) {
          // Calculate the adjacent pixel for this kernel point
          int pos = (y + ky)*img.width + (x + kx);

          // Process each channel separately, Red first.
          float valRed = red(img.pixels[pos]);
          // Multiply adjacent pixels based on the kernel values
          sumRed += kernel[ky+1][kx+1] * valRed;

          // Green
          float valGreen = green(img.pixels[pos]);
          sumGreen += kernel[ky+1][kx+1] * valGreen;

          // Blue
          float valBlue = blue(img.pixels[pos]);
          sumBlue += kernel[ky+1][kx+1] * valBlue;
        }
      }
      // For this pixel in the new image, set the output value
      // based on the sum from the kernel
      blurImg.pixels[y*blurImg.width + x] = color(sumRed, sumGreen, sumBlue);
    }
  }
  // State that there are changes to blurImg.pixels[]
  blurImg.updatePixels();

  image(blurImg, width/2, 0); // Draw the new image
}
