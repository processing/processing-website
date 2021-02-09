for (int y = 0; y < 100; y++) {
  float x = randomGaussian() * 15;
  line(50, y, 50 + x, y);
}