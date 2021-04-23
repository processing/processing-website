PImage img;

void setup() {
  size(400,400);
  img = loadImage("Toyokawa.jpg");
}

void draw() {
  image(img, 0, 0);
}