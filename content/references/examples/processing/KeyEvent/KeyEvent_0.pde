String message = "";
boolean capsLock = false;

void setup() {
  size(600, 300);
  background(220);
}

void draw() {
  background(220);
  
  // Instructions
  fill(0);
  textAlign(CENTER);
  textSize(14);
  text("Type with different modifier keys held down", width/2, 30);
  text("Try Shift, Ctrl, Alt, and special keys like arrows", width/2, 50);
  
  // Display current message
  textAlign(LEFT);
  textSize(16);
  text("Message: " + message, 20, 100);
  
  // Status
  textSize(12);
  text("Caps Lock: " + (capsLock ? "ON" : "OFF"), 20, 130);
}

void keyPressed(KeyEvent event) {
  char keyChar = event.getKey();
  int keyCode = event.getKeyCode();
  
  // Check modifier keys
  boolean shiftDown = event.isShiftDown();
  boolean ctrlDown = event.isControlDown();
  boolean altDown = event.isAltDown();
  boolean metaDown = event.isMetaDown();
  
  // Print detailed key information
  println("Key pressed: '" + keyChar + "' (code: " + keyCode + ")");
  println("Modifiers - Shift: " + shiftDown + ", Ctrl: " + ctrlDown + 
          ", Alt: " + altDown + ", Meta: " + metaDown);
  
  // Handle special keys
  if (keyCode == UP) {
    message = message.toUpperCase();
    println("Converted to uppercase");
  } else if (keyCode == DOWN) {
    message = message.toLowerCase();
    println("Converted to lowercase");
  } else if (keyCode == BACKSPACE && message.length() > 0) {
    message = message.substring(0, message.length()-1);
  } else if (keyCode == ENTER) {
    println("Message completed: " + message);
    message = "";
  } else if (keyCode == TAB) {
    message += "    "; // Add tab spacing
  } else if (keyChar >= 32 && keyChar <= 126) { // Printable characters
    // Handle modifier combinations
    if (ctrlDown && keyChar == 'c') {
      println("Copy command detected");
    } else if (ctrlDown && keyChar == 'v') {
      println("Paste command detected");
    } else if (ctrlDown && keyChar == 'z') {
      println("Undo command detected");
      if (message.length() > 0) {
        message = message.substring(0, message.length()-1);
      }
    } else if (!ctrlDown) { // Don't add text for Ctrl combinations
      if (shiftDown && altDown) {
        message += "[" + keyChar + "]"; // Special formatting
      } else {
        message += keyChar;
      }
    }
  }
  
  // Check for caps lock toggle (simplified detection)
  if (keyCode == 20) { // CAPS_LOCK key code
    capsLock = !capsLock;
  }
}
