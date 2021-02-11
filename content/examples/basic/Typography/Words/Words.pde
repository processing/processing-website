/**
 * Words. 
 * 
 * The text() function is used for writing words to the screen.
 * The letters can be aligned left, center, or right with the 
 * textAlign() function. 
 */
  
PFont f;
  
void setup() {
  size(1280, 720);
  
  // Create the font
  printArray(PFont.list());
  f = createFont("SpaceMono-Regular.ttf", 52);
  textFont(f);
}

void draw() {
  background(102);
  textAlign(RIGHT);
  drawType(width * 0.25);
  textAlign(CENTER);
  drawType(width * 0.5);
  textAlign(LEFT);
  drawType(width * 0.75);
}

void drawType(float x) {
  line(x, 0, x, height);
  fill(0);
  text("ichi", x, 195);
  fill(51);
  text("ni", x, 295);
  fill(204);
  text("san", x, 395);
  fill(255);
  text("shi", x, 515);
}