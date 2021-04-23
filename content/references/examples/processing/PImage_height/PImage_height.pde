PImage photo;

void setup() {
  size(400, 400);
  photo = loadImage("mt-horai.jpg");
}

void draw() {
  image(photo, 0, 0);
}