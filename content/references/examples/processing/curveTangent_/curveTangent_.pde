size(400, 400);
noFill();
curve(20, 104, 292, 96, 292, 244, 60, 260); 
int steps = 6;
for (int i = 0; i <= steps; i++) {
  float t = i / float(steps);
  float x = curvePoint(20, 292, 292, 60, t);
  float y = curvePoint(104, 96, 244, 260, t);
  //ellipse(x, y, 20, 20);
  float tx = curveTangent(20, 292, 292, 60, t);
  float ty = curveTangent(104, 96, 244, 260, t);
  float a = atan2(ty, tx);
  a -= PI/2.0;
  line(x, y, cos(a)*32 + x, sin(a)*32 + y);
}