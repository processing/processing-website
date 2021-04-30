void setup() {
  size(400, 400, P3D);
  background(0);
  noStroke();
}

void draw() {
  // Include lights() at the beginning
  // of draw() to keep them persistent 
  lights();
  translate(80, 200, 0);
  sphere(120);
  translate(240, 0, 0);
  sphere(120);
}