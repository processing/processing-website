PShape square;  // The PShape object

void setup() {
  size(100, 100);
  // Creating the PShape as a square. The
  // numeric arguments are similar to rect().
  square = createShape(RECT, 0, 0, 50, 50);
  square.setFill(color(0, 0, 255));
  square.setStroke(false);
}

void draw() {
  shape(square, 25, 25);
}
