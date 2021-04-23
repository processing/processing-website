size(400, 400);

float a = 0.0;
float inc = TWO_PI/50.0;

for (int i = 0; i <= 400; i = i+8) {
  line(i, 200, i, 200+tan(a)*8.0);
  a = a + inc;
}