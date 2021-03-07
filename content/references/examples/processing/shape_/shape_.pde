PShape s;

void setup() {
  s = loadShape("bot.svg");
}

void draw() {
  shape(s, 40, 40, 320, 320);
}