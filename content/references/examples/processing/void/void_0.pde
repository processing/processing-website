void setup() {  // setup() does not return a value
  size(200, 200);
}

void draw() {  // draw() does not return a value
  line(10, 100, 190, 100);
  drawCircle();
}

void drawCircle() {  // This function also does not return a value
  ellipse(30, 30, 50, 50);
}
