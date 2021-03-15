PGraphics pg;
int x = 0;

void setup() {
  fullScreen(P2D);
  pg = createGraphics(width, height, P2D);
  pg.smooth(4);
}

void draw() {
  pg.beginDraw();
  pg.background(0);
  pg.ellipse(x, height/2, height/4, height/4);
  pg.endDraw();
  image(pg, 0, 0);
  x += 1;
}