void setup() {
  size(200, 200, P3D); 
  hint(DISABLE_DEPTH_TEST);
}

void draw() {
  background(204);
  pushMatrix();
  translate(width/2, height/2);
  rotateY(1);
  box(60);
  popMatrix();
  line(10, 100, 190, 100);
}
