FloatDict inventory;

void setup() {
  size(200, 200);
  inventory = new FloatDict();
  inventory.set("coffee",108.6);
  inventory.set("flour",5.8);
  inventory.set("tea",8.2);
  println(inventory);
  inventory.set("coffee", 12.4);  // Less coffee
  inventory.set("sugar", 5.8);   // Add sugar
  println(inventory);
}

