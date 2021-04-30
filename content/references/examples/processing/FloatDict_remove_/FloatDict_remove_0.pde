FloatDict inventory;

void setup() {
  size(200, 200);
  inventory = new FloatDict();
  inventory.set("coffee",108.6);
  inventory.set("flour",5.8);
  inventory.set("tea",8.2);
  println(inventory);  // Full inventory
  inventory.remove("flour");
  println(inventory);  // Flour is removed from list
}

