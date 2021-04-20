float x = 0;

void setup() {
  size(200, 200);
  noLoop();
}

void draw() {
  background(204);
  line(x, 0, x, height); 
}

void mousePressed() {
  x += 1;
  redraw();
}
