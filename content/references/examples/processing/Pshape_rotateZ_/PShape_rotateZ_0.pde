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
  // Rotate the shape around the z-axis each time the mouse is pressed
  s.rotateZ(0.1);  
}
