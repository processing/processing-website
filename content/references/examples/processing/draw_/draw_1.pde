void setup() {
  size(200, 200);
}

// Although empty here, draw() is needed so
// the sketch can process user input events
// (mouse presses in this case).
void draw() { }

void mousePressed() {
  line(mouseX, 10, mouseX, 90);
}
