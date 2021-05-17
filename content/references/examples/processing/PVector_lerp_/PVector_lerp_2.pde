// Non-static (lerp on a specific vector)

PVector v;

void setup() {
  v = new PVector(0.0, 0.0);
}

void draw() {
  v.lerp(mouseX, mouseY, 0.0, 0.1);
  ellipse(v.x, v.y, 20, 20);
}
