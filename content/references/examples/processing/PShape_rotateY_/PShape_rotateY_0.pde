PShape s;

void setup() {
  size(100, 100, P3D);
  s = loadShape("ohio.svg");
}

void draw() {
  background(204);
  shape(s);
}

void mousePressed() {
  // Rotate the shape around the y-axis each time the mouse is pressed
  s.rotateY(0.1);  
}
