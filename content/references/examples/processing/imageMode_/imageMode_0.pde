PImage img;

void setup() {
  size(400,400);
  img = loadImage("Toyokawa.jpg");
}

void draw() {
  imageMode(CORNER);
  image(img, 40, 40, 200, 200);  // Draw image using CORNER mode
}