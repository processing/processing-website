void draw() {
  background(204);
  line(0, 0, width, height);
  if (mousePressed) {
    return;  // Break out of draw(), skipping the line statement below
  }
  line(0, height, width, 0);  // Executed only if mouse is not pressed
}
