import processing.pdf.*;

void setup() {
  size(400, 400);
  beginRaw(PDF, "raw.pdf");
}

void draw() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}

void keyPressed() {
  if (key == ' ') {
    endRaw();
    exit();
  }
}
