PGraphics pg;

void setup() {
  size(200, 200);
  pg = createGraphics(width, height);
}

void draw() {
  background(204);
  
  // Clear the PGraphics when the mouse is pressed
  if (mousePressed == true) {
    pg.beginDraw(); 
    pg.clear();
    pg.endDraw();
  } else {
    pg.beginDraw();
    pg.stroke(0, 102, 153);
    pg.line(width/2, height/2, mouseX, mouseY);
    pg.endDraw();
  }

  image(pg, 0, 0);
}
