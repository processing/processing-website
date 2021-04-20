// Run code at full screen using the P2D renderer
// across all screens on a multiple monitor setup

int x = 0;

void settings() {
  fullScreen(P2D, SPAN);
}

void setup() {
  background(0);
  noStroke();
  fill(102);
}

void draw() {
  rect(x, height*0.2, 1, height*0.6); 
  x = x + 2;
}
