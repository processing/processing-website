PVector v1, v2;

void setup() {
  noLoop();
  v1 = new PVector(40, 20, 0);
  v2 = new PVector(65, 70, 0); 
}

void draw() {
  ellipse(v1.x, v1.y, 12, 12);
  ellipse(v2.x, v2.y, 12, 12);
  v2.sub(v1);
  ellipse(v2.x, v2.y, 24, 24);
}
