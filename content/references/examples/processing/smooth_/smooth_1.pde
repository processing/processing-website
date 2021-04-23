int x = 0;

void setup() {
  fullScreen(P2D, SPAN);
  smooth(4);
}

void draw() {
  background(0);
  ellipse(x, height/2, height/4, height/4);
  x += 1;
}