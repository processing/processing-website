import processing.pdf.*;

void setup() {
  size(1024, 768, PDF);
}

void draw() {
  line(0, 0, width, height);
  line(0, height, width, 0);
}
