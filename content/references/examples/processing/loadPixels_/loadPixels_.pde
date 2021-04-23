size(400,400);
int halfImage = width*height/2;
PImage myImage = loadImage("mt-fuji.jpg");
image(myImage, 0, 0);

loadPixels();
for (int i = 0; i < halfImage; i++) {
  pixels[i+halfImage] = pixels[i];
}
updatePixels();