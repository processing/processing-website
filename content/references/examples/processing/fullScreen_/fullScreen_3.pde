// If more than one screen is attached to the computer, run the 
// code at the full dimensions across all of the attached screens

int x = 0;

void setup() {
  fullScreen(P2D, SPAN);
  background(0);
  noStroke();
  fill(102);
}

void draw() {
  rect(x, height*0.2, 1, height*0.6); 
  x = x + 2;
}
