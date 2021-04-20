PVector v;

void setup() {
  noLoop();
  v = new PVector(30, 60, 0);
}

void draw() {
  ellipse(v.x, v.y, 12, 12);
  v.div(6);
  ellipse(v.x, v.y, 24, 24);
}
