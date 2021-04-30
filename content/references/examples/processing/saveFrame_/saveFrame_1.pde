int x = 0;
void draw() {
  background(204);
  if (x < 100) {
    line(x, 0, x, 100);
    x = x + 1;
  } else {
    noLoop();
  }
  // Saves each frame as line-000001.png, line-000002.png, etc.
  saveFrame("line-######.png");
}
