float ypos = 50;

void setup() {
  size(100, 100);
  noLoop();
}

void draw() {
  line(0, 0, 100, ypos);
  // "this" references the Processing sketch,
  // and is not necessary in this case
  this.ypos = 100;
  line(0, 0, 100, ypos);
}

