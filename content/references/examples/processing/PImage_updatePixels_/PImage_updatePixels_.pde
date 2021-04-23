PImage myImage;
int halfImage;

void setup() {
  size(400, 400);
  halfImage = width * height/2;
  myImage = loadImage("shells.jpg");
  myImage.loadPixels();
  for (int i = 0; i < halfImage; i++) {
    myImage.pixels[i+halfImage] = myImage.pixels[i];
  }
  myImage.updatePixels();
}

void draw() {
  image(myImage, 0, 0);
}
