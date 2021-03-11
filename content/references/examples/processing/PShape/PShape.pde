  
PShape s;

void setup() {
  size(400, 400);
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully
  s = loadShape("bot.svg");
}

void draw() {
 shape(s, 40, 40, 320, 320);
}