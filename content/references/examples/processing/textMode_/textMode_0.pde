import processing.pdf.*;

void setup() {
  size(500, 500, PDF, "TypeDemo.pdf");
  textMode(SHAPE);
  textSize(180);
}

void draw() {
  text("ABC", 75, 350);
  exit();  // Quit the program
}
