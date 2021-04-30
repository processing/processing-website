FloatList inventory;

void setup() {
  size(200, 200);
  inventory = new FloatList();
  inventory.append(108.6);
  inventory.append(5.8);
  inventory.append(8.2);
  println(inventory);
  inventory.set(2, 20.6);
  println(inventory);
}

