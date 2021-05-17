PVector v;

void setup() {
  noLoop();
  v = new PVector(40, 20, 0);
}

void draw() {
  ellipse(v.x, v.y, 12, 12);
  ellipse(25, 50, 12, 12);
  v.add(25, 50, 0);
  ellipse(v.x, v.y, 24, 24);
}
