// Nested for() loops can be used to
// generate two-dimensional patterns
size(400, 400);

for (int i = 120; i < 320; i = i+20) {
  for (int j = 0; j < 320; j = j+20) {
    point(i, j);
  }
}