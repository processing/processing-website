size(400,400);
noStroke();
colorMode(RGB, 400);
for (int i = 0; i < 400; i++) {
  for (int j = 0; j < 400; j++) {
    stroke(i, j, 0);
    point(i, j);
  }
}
