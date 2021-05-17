PShape s;

void setup() {
  s = loadShape("bot.svg");
}

void draw() {
  background(204);
  shape(s);
}

void mousePressed() {
  // Move the shape 10 pixels right each time the mouse is pressed
  s.translate(10, 0);  
}
