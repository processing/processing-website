IntDict inventory;

void setup() {
  size(200, 200);
  inventory = new IntDict();
  inventory.set("cd", 84);
  inventory.set("tapes", 15);
  inventory.set("records", 102);
  println(inventory);
  noLoop();
  fill(0);
  textAlign(CENTER);
}

void draw() {
  int numRecords = inventory.get("records");
  text(numRecords, width/2, height/2);
}

