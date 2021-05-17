int s = 0;
for (int i = 5; i < 100; i += 5) {
  s = (i < 50) ? 0 : 255;
  stroke(s);
  line(30, i, 80, i);
}
