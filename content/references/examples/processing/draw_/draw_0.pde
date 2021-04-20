float yPos = 0.0;

void setup() {  // setup() runs once
  size(200, 200);
  frameRate(30);
}
 
void draw() {  // draw() loops forever, until stopped
  background(204);
  yPos = yPos - 1.0;
  if (yPos < 0) {
    yPos = height;
  }
  line(0, yPos, width, yPos);
}
