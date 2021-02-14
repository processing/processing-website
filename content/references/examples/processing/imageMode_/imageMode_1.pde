PImage img;

void setup() {
  size(400,400);
  img = loadImage("Toyokawa.jpg");
}

void draw() {
  imageMode(CORNERS);
  image(img, 40, 40, 360, 160);  // Draw image using CORNERS mode
}