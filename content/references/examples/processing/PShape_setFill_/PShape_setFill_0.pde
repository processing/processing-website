PShape circle;

void setup() {  
  size(640, 360, P2D);
  circle = createShape(ELLIPSE, 0, 0, 200, 200);
  circle.setStroke(color(255));  
}

void draw() {
  background(51);
  circle.setFill(color(random(255)));
  translate(mouseX, mouseY);
  shape(circle);
}

