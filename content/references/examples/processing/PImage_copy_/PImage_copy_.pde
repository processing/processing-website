PImage flowers;

void setup() {
  size(400, 400);
  flowers = loadImage("flowers.jpg");
  int x = width/2;
  flowers.copy(x, 0, x, height, 0, 0, x, height);
}

void draw() {
  image(flowers, 0, 0);
}