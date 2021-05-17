PGraphics pg;

void setup() {
  size(200, 200);
  pg = createGraphics(100, 100);
}

void draw() {
  pg.beginDraw();
  pg.background(102);
  pg.stroke(255);
  pg.line(pg.width*0.5, pg.height*0.5, mouseX, mouseY);
  pg.endDraw();
  image(pg, 50, 50); 
}
