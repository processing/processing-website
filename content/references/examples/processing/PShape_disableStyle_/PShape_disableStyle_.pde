
PShape s;

void setup() {
  size(400, 400);
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully
  s = loadShape("bot.svg");
}

void draw() {
  s.disableStyle();
  shape(s, -120, 40, 320, 320);
  s.enableStyle();
  shape(s, 200, 40, 320, 320);
}
