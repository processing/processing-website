int x = 0;

void setup() {
  size(200, 200);
  background(0);
  noStroke();
  fill(102);
}

void draw() {
  rect(x, 10, 2, 80); 
  x = x + 1;
}
