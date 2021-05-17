// Move the mouse left and right across the image
// to see the cursor change from a cross to a hand

void setup() {
  size(100, 100);
}

void draw() {
  if (mouseX < 50) {
    cursor(CROSS);
  } else {
    cursor(HAND);
  }
}
