IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);
  if (inventory.hasKey("records") == true) {
    println("Yes, we have records."); 
  } else {
    println("Sorry, no records.");
  }
}

