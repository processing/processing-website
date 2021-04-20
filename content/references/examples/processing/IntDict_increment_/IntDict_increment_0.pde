IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);  // There are 15 tapes
  inventory.increment("tapes");
  println(inventory);  // There are now 16 tapes
}

