void setup() {
  size(600, 400);
  pixelDensity(2);  // Double the pixel density
  println(width, height);
  println(pixelWidth, pixelHeight);
}

void draw() {
  loadPixels();
  // Fill all the pixels to blue with using
  // pixelWidth and pixelHeight
  for (int i = 0; i < pixelWidth * pixelHeight; i++) {
    pixels[i] = color(0, 0, 255);
  }
  // Fill one quarter of the pixels to yellow
  // because the pixel density is set to 2 in setup()
  // and 'width' and 'height' don't reflect the pixel 
  // dimensions of the sketch
  for (int i = 0; i < width * height; i++) {
    pixels[i] = color(255, 255, 0);
  }
  updatePixels();
  noLoop();
}
