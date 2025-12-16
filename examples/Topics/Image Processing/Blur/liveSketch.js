/**
 * Blur.
 *
 * A low-pass filter blurs an image. This program analyzes every
 * pixel in an image and blends it with the neighboring pixels
 * to blur the image.
 */

function runLiveSketch(s) {
  var v = 1.0 / 9.0;
  var kernel = [
    [v, v, v],
    [v, v, v],
    [v, v, v]
  ];

  var img;
  s.preload = () => {
    img = s.loadImage('/livesketch/blur/moon.jpg'); // Load the original image
  };

  s.setup = () => {
    s.createCanvas(640, 360);
    s.pixelDensity(1);
    s.noLoop();
  };

  s.draw = () => {
    s.image(img, 0, 0); // Displays the image from point (0,0)
    img.loadPixels();

    // Create an opaque image of the same size as the original
    var edgeImg = s.createImage(img.width, img.height, s.RGB);
    edgeImg.loadPixels();

    // Loop through every pixel in the image
    for (var y = 1; y < img.height - 1; y++) {
      // Skip top and bottom edges
      for (var x = 1; x < img.width - 1; x++) {
        // Skip left and right edges
        var sum = 0; // Kernel sum for this pixel
        for (var ky = -1; ky <= 1; ky++) {
          for (var kx = -1; kx <= 1; kx++) {
            // Calculate the adjacent pixel for this kernel point
            var pos = ((y + ky) * img.width + (x + kx)) * 4;
            // Image is grayscale, red/green/blue are identical
            var val = img.pixels[pos];
            // Multiply adjacent pixels based on the kernel values
            sum += kernel[ky + 1][kx + 1] * val;
          }
        }
        // For this pixel in the new image, set the gray value
        // based on the sum from the kernel
        var pos = (y * img.width + x) * 4;
        edgeImg.pixels[pos] = sum;
        edgeImg.pixels[pos + 1] = sum;
        edgeImg.pixels[pos + 2] = sum;
        edgeImg.pixels[pos + 3] = 255;
      }
    }
    // State that there are changes to edgeImg.pixels[]
    edgeImg.updatePixels();

    s.image(edgeImg, s.width / 2, 0); // Draw the new image
  };
}
