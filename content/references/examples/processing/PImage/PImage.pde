PImage photo;

void setup() {
  size(400, 400);
  photo = loadImage("Toyokawa-city.jpg");
}

void draw() {
  image(photo, 0, 0);
}