// Example showing KeyEvent parameter usage
// Type keys while holding different modifiers

String message = "";

void setup() {
  size(300, 150);
  background(220);
}

void draw() {
  background(220);
  fill(0);
  text("Type with modifier keys held down", 10, 20);
  text("Message: " + message, 10, 40);
  text("Try Shift, Ctrl, Alt while typing", 10, 120);
}

void keyPressed(KeyEvent event) {
  char keyChar = event.getKey();
  int keyCode = event.getKeyCode();
  
  // Check modifier keys from event
  boolean shift = event.isShiftDown();
  boolean ctrl = event.isControlDown();
  boolean alt = event.isAltDown();
  boolean meta = event.isMetaDown();
  
  // Handle special keys
  if (keyCode == BACKSPACE && message.length() > 0) {
    message = message.substring(0, message.length()-1);
  } else if (keyCode == ENTER) {
    message = "";
  } else if (keyChar >= 32 && keyChar <= 126) { // Printable characters
    // Modify character based on modifiers
    if (ctrl && alt) {
      message += "[" + keyChar + "]"; // Special formatting
    } else if (shift && !Character.isUpperCase(keyChar)) {
      message += Character.toUpperCase(keyChar);
    } else if (alt) {
      message += "_" + keyChar + "_"; // Emphasize
    } else {
      message += keyChar;
    }
  }
  
  // Print detailed event info
  println("Key: '" + keyChar + "' Code: " + keyCode);
  println("Modifiers: Shift=" + shift + " Ctrl=" + ctrl + 
          " Alt=" + alt + " Meta=" + meta);
  if (event.isAutoRepeat()) {
    println("(Auto-repeat event)");
  }
}
