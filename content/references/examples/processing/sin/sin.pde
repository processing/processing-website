size(400, 400);
float a = 0.0;
float inc = TWO_PI/25.0;

for (int i = 0; i < 400; i=i+16) {
  line(i, 200, i, 200+sin(a)*160.0);
  a = a + inc;
}