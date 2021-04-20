PShape s;

void setup() {
  size(100, 100);
  s = loadShape("ohio.svg");
}

void draw() {
  background(204);
  shape(s);
}

void mousePressed() {
  // Rotate the shape each time the mouse is pressed
  s.rotate(0.1);  
}
