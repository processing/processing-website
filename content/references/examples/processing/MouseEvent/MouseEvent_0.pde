void setup() {
  size(400, 400);
  background(220);
}

void draw() {
  // Draw instructions
  fill(0);
  textAlign(CENTER);
  text("Click and drag with different mouse buttons", width/2, 20);
  text("Hold Shift, Ctrl, or Alt while clicking", width/2, 40);
}

void mousePressed(MouseEvent event) {
  // Get mouse coordinates from event
  int x = event.getX();
  int y = event.getY();
  
  // Get which button was pressed
  int button = event.getButton();
  
  // Check for modifier keys
  boolean shiftDown = event.isShiftDown();
  boolean ctrlDown = event.isControlDown();
  boolean altDown = event.isAltDown();
  
  // Set color based on button and modifiers
  if (button == LEFT) {
    fill(255, 0, 0); // Red for left button
  } else if (button == RIGHT) {
    fill(0, 255, 0); // Green for right button
  } else if (button == CENTER) {
    fill(0, 0, 255); // Blue for center button
  }
  
  // Modify brightness based on modifier keys
  if (shiftDown) {
    fill(red(color(0)), green(color(0)), blue(color(0)), 100);
  }
  if (ctrlDown) {
    stroke(255);
    strokeWeight(3);
  } else {
    noStroke();
  }
  
  // Draw circle at mouse position
  ellipse(x, y, altDown ? 50 : 20, altDown ? 50 : 20);
  
  // Print event information
  println("Mouse pressed at (" + x + ", " + y + ")");
  println("Button: " + button + ", Shift: " + shiftDown + 
          ", Ctrl: " + ctrlDown + ", Alt: " + altDown);
}
