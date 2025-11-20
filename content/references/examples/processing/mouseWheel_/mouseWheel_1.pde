// Enhanced mouseWheel example showing MouseEvent usage
float zoom = 1.0;
int circleX = 50;
int circleY = 50;

void setup() {
  size(200, 200);
}

void draw() {
  background(220);
  
  // Instructions
  fill(0);
  textAlign(CENTER);
  textSize(10);
  text("Use mouse wheel to zoom", width/2, 15);
  text("Hold Shift for horizontal scroll", width/2, 25);
  text("Hold Ctrl for precision mode", width/2, 35);
  
  // Draw circle with zoom applied
  pushMatrix();
  translate(width/2, height/2);
  scale(zoom);
  fill(255, 0, 0);
  ellipse(circleX - width/2, circleY - height/2, 30, 30);
  popMatrix();
  
  // Show zoom level
  fill(0);
  textAlign(LEFT);
  text("Zoom: " + nf(zoom, 1, 2), 10, height-20);
  text("Position: (" + circleX + ", " + circleY + ")", 10, height-10);
}

void mouseWheel(MouseEvent event) {
  float wheelCount = event.getCount();
  int mouseEventX = event.getX();
  int mouseEventY = event.getY();
  
  // Check modifier keys from event
  boolean shiftDown = event.isShiftDown();
  boolean ctrlDown = event.isControlDown();
  boolean altDown = event.isAltDown();
  
  // Different behavior based on modifiers
  if (shiftDown) {
    // Horizontal scrolling
    circleX += wheelCount * 5;
    circleX = constrain(circleX, 0, width);
    println("Horizontal scroll at (" + mouseEventX + ", " + mouseEventY + ")");
  } else if (ctrlDown) {
    // Precision zoom
    zoom += wheelCount * 0.05;
    zoom = constrain(zoom, 0.1, 3.0);
    println("Precision zoom: " + zoom);
  } else if (altDown) {
    // Vertical scrolling
    circleY += wheelCount * 5;
    circleY = constrain(circleY, 0, height);
    println("Vertical scroll");
  } else {
    // Normal zoom
    zoom += wheelCount * 0.1;
    zoom = constrain(zoom, 0.1, 3.0);
    println("Normal zoom: " + zoom);
  }
  
  // Print detailed event information
  println("Wheel count: " + wheelCount + " at (" + mouseEventX + ", " + mouseEventY + ")");
  println("Modifiers: Shift=" + shiftDown + " Ctrl=" + ctrlDown + " Alt=" + altDown);
}
