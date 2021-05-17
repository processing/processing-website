PShape s;

void setup() {
  size(100, 100);
  s = loadShape("ohio.svg");
  s.rotate(PI/6);
}

void draw() {
  background(204);
  shape(s);
}

void mousePressed() {
  // Removes all transformations applied to shape
  // Loads the identity matrix
  s.resetMatrix();
}
