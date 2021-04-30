FloatDict inventory;

void setup() {
  size(200, 200);
  inventory = new FloatDict();
  inventory.set("coffee",108.6);
  inventory.set("flour",5.8);
  inventory.set("tea",8.2);
  println(inventory);
  noLoop();
  fill(0);
  textAlign(CENTER);
}

void draw() {
  float weight = inventory.get("coffee");
  text(weight, width/2, height/2);
}

