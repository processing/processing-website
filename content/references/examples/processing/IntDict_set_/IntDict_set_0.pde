IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);
  inventory.set("records", 90);  // Fewer records
  inventory.set("mp3s", 2054);   // Add MP3s
  println(inventory);
}

