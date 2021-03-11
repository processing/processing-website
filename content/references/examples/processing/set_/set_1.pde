size(400,400);

for (int i = 120; i < width-60; i++) {
  for (int j = 80; j < height-100; j++) {
    color c = color(j, i, 0);    
    set(i, j, c);
  }
}