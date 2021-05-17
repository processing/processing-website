float xoff = 0.0;

void setup() {
  noiseSeed(0);
  stroke(0, 10);
}

void draw() {
  xoff = xoff + .01;
  float n = noise(xoff) * width;
  line(n, 0, n, height);
}
