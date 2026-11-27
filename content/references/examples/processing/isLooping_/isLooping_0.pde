void setup() {
  size(200, 200);
  noLoop();
}

void draw() {
  background(204);
  if (isLooping()) {
    line(0, 0, width, height);
  } else {
    line(0, height, width, 0);
  }
}

void mousePressed() {
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}
