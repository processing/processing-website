PShape s;

void setup() {
  size(400,400);
  s = loadShape("bot.svg");
}

void draw() {
  shape(s, 40, 40, 320, 320);
}