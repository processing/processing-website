boolean someMode = false;

void setup() {
  noLoop();
}

void draw() {
  if (someMode) {
    // do something
  }
}

void mousePressed() {
  someMode = true;
  redraw();  // or loop()
}
