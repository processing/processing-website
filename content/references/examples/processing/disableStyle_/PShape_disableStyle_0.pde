PShape s;

void setup() {
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully
  s = loadShape("bot.svg");
}

void draw() {
  s.disableStyle();
  shape(s, -30, 10, 80, 80);
  s.enableStyle();
  shape(s, 50, 10, 80, 80);
}
