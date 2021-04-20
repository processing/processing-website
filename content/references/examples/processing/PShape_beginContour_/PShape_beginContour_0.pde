PShape s;

void setup() {
  size(200, 200, P2D);

  // Make a shape
  s = createShape();
  s.beginShape();
  //s.noStroke();

  // Exterior part of shape
  s.vertex(-50,-50);
  s.vertex(50,-50);
  s.vertex(50,50);
  s.vertex(-50,50);

  // Interior part of shape
  s.beginContour();
  s.vertex(-20,-20);
  s.vertex(-20,20);
  s.vertex(20,20);
  s.vertex(20,-20);
  s.endContour();

  // Finish off shape
  s.endShape(CLOSE);
}

void draw() {
  background(204);
  translate(width/2, height/2);
  s.rotate(0.01);
  shape(s);
}
