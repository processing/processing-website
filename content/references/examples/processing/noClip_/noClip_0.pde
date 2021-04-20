void setup() {
  size(200, 200);
  imageMode(CENTER);
}

void draw() {
  background(204);
  if (mousePressed) {
    clip(mouseX, mouseY, 100, 100);
  } else {
    noClip();
  }
  line(0, 0, width, height);
  line(0, height, width, 0);
}
