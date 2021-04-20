PShape s;  // The PShape object

void setup() {  
  size(100, 100);
  s = createShape();
  s.beginShape();
  s.fill(0, 0, 255);
  s.noStroke();
  s.vertex(0, 0);
  s.vertex(0, 50);
  s.vertex(50, 0);
  s.endShape();
}

void draw() {
  shape(s, 25, 25);
}
