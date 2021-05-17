PVector v;

void setup() {
  noLoop();
  v = new PVector(65, 70, 0);
}

void draw() {
  ellipse(v.x, v.y, 12, 12);
  ellipse(40, 20, 12, 12);
  v.sub(40, 20, 0);
  ellipse(v.x, v.y, 24, 24);
}
