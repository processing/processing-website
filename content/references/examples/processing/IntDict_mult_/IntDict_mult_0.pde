IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);  // There are 84 cds
  inventory.mult("cd", 2);
  println(inventory);  // There are 168 cds
}

