PImage img1, img2;

void setup() {
 size(400, 400);
  img1 = loadImage("flower.jpg");
  img2 = loadImage("flower.jpg");
  img2.filter(POSTERIZE, 4);
}

void draw() {
  image(img1, 0, 0);
  image(img2, width/2, 0);
}