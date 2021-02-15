PImage img = createImage(264, 264, ARGB);
img.loadPixels();
for (int i = 0; i < img.pixels.length; i++) {
  img.pixels[i] = color(0, 90, 102, i % img.width); 
}
img.updatePixels();
image(img, 68, 68);
image(img, 136, 136);