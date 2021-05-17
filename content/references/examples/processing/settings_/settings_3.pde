int w = 200;
int h = 200;
int x = 0;

void settings() {
  size(w, h);
}

void setup() {
  background(0);
  noStroke();
  fill(102);
}

void draw() {
  rect(x, 10, 1, 180); 
  x = x + 2;
}
