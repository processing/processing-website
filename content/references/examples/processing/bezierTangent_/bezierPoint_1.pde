noFill();
bezier(340, 80, 40, 40, 360, 360, 60, 320);
stroke(255, 102, 0);
int steps = 16;
for (int i = 0; i <= steps; i++) {
  float t = i / float(steps);
  float x = bezierPoint(340, 40, 360, 60, t);
  float y = bezierPoint(80, 40, 360, 320, t);
  float tx = bezierTangent(340, 40, 360, 60, t);
  float ty = bezierTangent(80, 40, 360, 320, t);
  float a = atan2(ty, tx);
  a -= HALF_PI;
  line(x, y, cos(a)*32 + x, sin(a)*32 + y);
}
