// If more than one screen is attached to the computer, run the 
// code at the full dimensions on the screen defined by the 
// parameter to fullScreen()

int x = 0;

void setup() {
  fullScreen(2);
  background(0);
  noStroke();
  fill(102);
}

void draw() {
  rect(x, height*0.2, 1, height*0.6); 
  x = x + 2;
}
