noFill();
bezier(340, 80, 40, 40, 360, 360, 60, 320);
fill(255);
int steps = 10;
for (int i = 0; i <= steps; i++) {
  float t = i / float(steps);
  float x = bezierPoint(340, 40, 360, 60, t);
  float y = bezierPoint(80, 40, 360, 320, t);
  ellipse(x, y, 10, 10);
}