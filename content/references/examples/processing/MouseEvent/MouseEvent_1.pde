void setup() {
  size(400, 400);
  background(220);
}

void draw() {
  fill(0);
  textAlign(CENTER);
  text("Use mouse wheel to zoom, move mouse to pan", width/2, 20);
  text("Wheel count and coordinates shown below", width/2, 40);
}

void mouseWheel(MouseEvent event) {
  // Get wheel count (positive = down/away, negative = up/toward)
  float wheelCount = event.getCount();
  
  // Get mouse position when wheel was used
  int x = event.getX();
  int y = event.getY();
  
  // Check modifier keys
  boolean shiftDown = event.isShiftDown();
  boolean ctrlDown = event.isControlDown();
  
  // Draw feedback
  fill(0, 150);
  rect(x-30, y-10, 60, 20);
  
  fill(255);
  textAlign(CENTER);
  text(int(wheelCount), x, y+5);
  
  // Print detailed information
  println("Mouse wheel at (" + x + ", " + y + ")");
  println("Wheel count: " + wheelCount);
  println("Shift: " + shiftDown + ", Ctrl: " + ctrlDown);
  
  // Different behavior based on modifiers
  if (shiftDown) {
    println("Horizontal scroll mode");
  } else if (ctrlDown) {
    println("Precision scroll mode");
  } else {
    println("Normal scroll mode");
  }
}

void mouseMoved(MouseEvent event) {
  // Show current mouse coordinates from event
  fill(255);
  rect(10, height-40, 200, 30);
  
  fill(0);
  textAlign(LEFT);
  text("Mouse: (" + event.getX() + ", " + event.getY() + ")", 15, height-20);
}
