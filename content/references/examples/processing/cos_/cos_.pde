size(400,400);
float a = 0.0;
float inc = TWO_PI/25.0;
for (int i = 0; i < 25; i++) {
  line(i*16, 200, i*16, 200+cos(a)*160.0);
  a = a + inc;
}