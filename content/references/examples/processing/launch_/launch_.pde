void setup() {
  size(200, 200);
}

void draw() {
  // draw() must be present for mousePressed() to work
}

void mousePressed() {
  println("Opening Process_4");
  launch("/Applications/Process_4.app");
}
