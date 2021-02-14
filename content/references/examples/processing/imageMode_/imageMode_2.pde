PImage img;

void setup() {
  size(400,400);
  img = loadImage("Toyokawa.jpg");
}

void draw() {
  imageMode(CENTER);
  image(img, 200, 200, 320, 320);  // Draw image using CENTER mode
}