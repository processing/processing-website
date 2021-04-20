IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);  // There are 84 cds
  inventory.sub("cd", 20);
  println(inventory);  // There are 64 cds
}

