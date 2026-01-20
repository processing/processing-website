// Example showing MouseEvent parameter usage
// Click with different buttons and modifier keys

void setup() {
  size(200, 200);
  background(220);
}

void draw() {
  fill(0);
  textAlign(CENTER);
  text("Click with different buttons", width/2, 20);
  text("Hold Shift, Ctrl, or Alt", width/2, 35);
}

void mousePressed(MouseEvent event) {
  // Get coordinates from event (unaffected by windowRatio)
  int x = event.getX();
  int y = event.getY();
  
  // Get which button was pressed
  int button = event.getButton();
  
  // Check modifier keys
  boolean shift = event.isShiftDown();
  boolean ctrl = event.isControlDown();
  boolean alt = event.isAltDown();
  
  // Set color based on button
  if (button == LEFT) fill(255, 0, 0);
  else if (button == RIGHT) fill(0, 255, 0);
  else if (button == CENTER) fill(0, 0, 255);
  
  // Modify based on modifiers
  if (shift) fill(red(color(255)), green(color(255)), blue(color(255)), 100);
  
  // Draw circle
  ellipse(x, y, alt ? 40 : 20, alt ? 40 : 20);
  
  // Print info
  println("Button: " + button + " at (" + x + "," + y + ")");
  println("Modifiers: Shift=" + shift + " Ctrl=" + ctrl + " Alt=" + alt);
}
