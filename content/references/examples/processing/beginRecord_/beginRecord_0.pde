import processing.pdf.*;

void setup() {
  size(400, 400);
  beginRecord(PDF, "everything.pdf");
}

void draw() {
  ellipse(mouseX, mouseY, 10, 10);
}

void mousePressed() {
  endRecord();
  exit();
} 
