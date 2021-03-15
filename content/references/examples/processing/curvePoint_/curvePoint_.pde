size(400,400);

noFill();
curve(20, 104, 20, 104, 292, 96, 292, 244);
curve(20, 104, 292, 96, 292, 244, 60, 260);

fill(255);
ellipseMode(CENTER);
int steps = 6;
for (int i = 0; i <= steps; i++) {
  float t = i / float(steps);
  float x = curvePoint(20, 20, 292, 292, t);
  float y = curvePoint(104, 104, 96, 244, t);
  ellipse(x, y, 10, 10);
  x = curvePoint(20, 292, 292, 60, t);
  y = curvePoint(104, 96, 244, 260, t);
  ellipse(x, y, 10, 10);
}