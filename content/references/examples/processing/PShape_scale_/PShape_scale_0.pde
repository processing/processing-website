PShape s;

void setup() {
  s = loadShape("bot.svg");
}

void draw() {
  background(204);
  shape(s);
}

void mousePressed() {
  // Shrink the shape 90% each time the mouse is pressed
  s.scale(0.9);  
}
