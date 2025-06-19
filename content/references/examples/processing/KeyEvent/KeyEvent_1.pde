ArrayList<String> keyLog = new ArrayList<String>();
int maxLogEntries = 15;

void setup() {
  size(500, 400);
  background(240);
}

void draw() {
  background(240);
  
  // Title
  fill(0);
  textAlign(CENTER);
  textSize(16);
  text("Keyboard Event Logger", width/2, 25);
  
  // Instructions
  textSize(12);
  text("Press any keys to see detailed event information", width/2, 45);
  
  // Draw log entries
  textAlign(LEFT);
  textSize(11);
  for (int i = 0; i < keyLog.size(); i++) {
    fill(0, 200);
    text(keyLog.get(i), 10, 80 + i * 15);
  }
  
  // Draw border around log area
  noFill();
  stroke(100);
  rect(5, 60, width-10, height-70);
}

void keyPressed(KeyEvent event) {
  logKeyEvent("PRESSED", event);
}

void keyReleased(KeyEvent event) {
  logKeyEvent("RELEASED", event);
}

void keyTyped(KeyEvent event) {
  logKeyEvent("TYPED", event);
}

void logKeyEvent(String type, KeyEvent event) {
  char keyChar = event.getKey();
  int keyCode = event.getKeyCode();
  
  // Build modifier string
  String modifiers = "";
  if (event.isShiftDown()) modifiers += "Shift+";
  if (event.isControlDown()) modifiers += "Ctrl+";
  if (event.isAltDown()) modifiers += "Alt+";
  if (event.isMetaDown()) modifiers += "Meta+";
  
  // Create readable key name
  String keyName;
  if (keyCode == UP) keyName = "UP";
  else if (keyCode == DOWN) keyName = "DOWN";
  else if (keyCode == LEFT) keyName = "LEFT";
  else if (keyCode == RIGHT) keyName = "RIGHT";
  else if (keyCode == ENTER) keyName = "ENTER";
  else if (keyCode == TAB) keyName = "TAB";
  else if (keyCode == BACKSPACE) keyName = "BACKSPACE";
  else if (keyCode == DELETE) keyName = "DELETE";
  else if (keyCode == ESC) keyName = "ESC";
  else if (keyChar >= 32 && keyChar <= 126) keyName = "'" + keyChar + "'";
  else keyName = "code:" + keyCode;
  
  // Format log entry
  String logEntry = type + " " + modifiers + keyName;
  if (event.isAutoRepeat()) {
    logEntry += " (auto-repeat)";
  }
  
  // Add to log
  keyLog.add(logEntry);
  
  // Keep log size manageable
  while (keyLog.size() > maxLogEntries) {
    keyLog.remove(0);
  }
  
  // Also print to console for debugging
  println(logEntry);
}
