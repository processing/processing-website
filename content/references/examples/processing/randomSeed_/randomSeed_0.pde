randomSeed(0);
for (int i=0; i < 100; i++) {
  float r = random(0, 255);
  stroke(r);
  line(i, 0, i, 100);
}

