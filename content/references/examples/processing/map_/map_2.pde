void setup() {
  size(200, 200);
  noStroke();
}

void draw() {
  background(204);
  float  x1 = map(mouseX, 0, width, 50, 150);
  ellipse(x1, 75, 50, 50);  
  float x2 = map(mouseX, 0, width, 0, 200);
  ellipse(x2, 125, 50, 50);  
}
