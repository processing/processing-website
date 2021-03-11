size(400,400);
PImage img = loadImage("mt-fuji.jpg");
image(img, 0, 0);
int halfImage = img.width * img.height/2;
loadPixels();
for (int i = 0; i < halfImage; i++) {
  pixels[i+halfImage] = pixels[i];
}
updatePixels();