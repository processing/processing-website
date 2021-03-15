PShape s;

void setup() {
  size(400, 400);
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully 
  s = loadShape("bot.svg");
}
void draw() {
  background(204);
  shape(s, 40, 40, 320, 320);  // Draw shape
 

s.setVisible(mousePressed);
 if (s.isVisible() == false) {  // Or use: "if (!s.isVisible)"
    noFill();
    rect(40, 40, 320, 320); 
 } 
}