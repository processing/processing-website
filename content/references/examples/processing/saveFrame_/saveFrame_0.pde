int x = 0;
void draw() {
  background(204);
  if (x < 100) {
    line(x, 0, x, 100);
    x = x + 1;
  } else {
    noLoop();
  }
  // Saves each frame as screen-0001.tif, screen-0002.tif, etc.
  saveFrame(); 
}
