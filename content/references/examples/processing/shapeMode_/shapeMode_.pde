
PShape bot; 

void setup() {
  size(400, 400);
  bot = loadShape("bot.svg");
}

void draw() {
  shapeMode(CENTER);
  shape(bot, 140, 140, 200, 200);
  shapeMode(CORNER);
  shape(bot, 140, 140, 200, 200);
}