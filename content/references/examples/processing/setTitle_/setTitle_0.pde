void setup() {
  size(200, 200);
  surface.setTitle("Hello World!");
  surface.setResizable(true);
  surface.setLocation(100, 100);
}

void draw() {
  background(204);
  line(0, 0, width, height);
  line(width, 0, 0, height); 
}
