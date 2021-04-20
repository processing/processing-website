void setup() {
  size(200, 200);
}

float x = 0.0;

void draw() {
  background(204);
  x = x + 0.1;
  if (x > width) {
    x = 0;
  }
  line(x, 0, x, height); 
}

void mousePressed() {
  noLoop();
}

void mouseReleased() {
  loop();
}
