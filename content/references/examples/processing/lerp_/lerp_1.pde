size(400, 400);
int x1 = 60;
int y1 = 40;
int x2 = 320;
int y2 = 360;
line(x1, y1, x2, y2);
for (int i = 0; i <= 40; i++) {
  float x = lerp(x1, x2, i/40.0) + 40;
  float y = lerp(y1, y2, i/40.0);
  point(x, y);
}