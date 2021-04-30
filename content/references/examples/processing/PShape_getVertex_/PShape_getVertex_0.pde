PShape s;

void setup() {
  size(100, 100);
  s = createShape();
  s.beginShape();
  s.vertex(0, 0);
  s.vertex(60, 0);
  s.vertex(60, 60);
  s.vertex(0, 60);
  s.endShape(CLOSE);
}

void draw() {
  translate(20, 20);
  for (int i = 0; i < s.getVertexCount(); i++) {
    PVector v = s.getVertex(i);
    v.x += random(-1, 1);
    v.y += random(-1, 1);
    s.setVertex(i, v);
  }
  shape(s);
}
