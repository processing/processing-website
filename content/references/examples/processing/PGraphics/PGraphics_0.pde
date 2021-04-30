PGraphics pg;

void setup() {
  size(100, 100);
  pg = createGraphics(40, 40);
}

void draw() {
  pg.beginDraw();
  pg.background(100);
  pg.stroke(255);
  pg.line(20, 20, mouseX, mouseY);
  pg.endDraw();
  image(pg, 9, 30); 
  image(pg, 51, 30);
}
