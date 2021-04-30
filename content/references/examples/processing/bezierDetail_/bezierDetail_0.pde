// Move the mouse left and right to see the detail change

void setup() {
  size(100, 100, P3D);
  noFill();
}

void draw() {
  background(204);
  int d = int(map(mouseX, 0, 100, 1, 20));
  bezierDetail(d);
  bezier(85, 20, 10, 10, 90, 90, 15, 80);
}
