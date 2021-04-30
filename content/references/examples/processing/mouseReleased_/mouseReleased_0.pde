// Click within the image to change 
// the value of the rectangle

int value = 0;

void draw() {
  fill(value);
  rect(25, 25, 50, 50);
}

void mouseReleased() {
  if (value == 0) {
    value = 255;
  } else {
    value = 0;
  }
}
