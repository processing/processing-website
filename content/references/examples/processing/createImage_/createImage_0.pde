size(400,400);
PImage img = createImage(264, 264, RGB);
img.loadPixels();
for (int i = 0; i < img.pixels.length; i++) {
  img.pixels[i] = color(0, 90, 102); 
}
img.updatePixels();
image(img, 68, 68);
