IntList inventory;

void setup() {
  size(200, 200);
  inventory = new IntList();
  inventory.append(84);
  inventory.append(15);
  inventory.append(102);
  println(inventory);
  inventory.sort();
  int[] sortedInventory = inventory.array();
  println(sortedInventory);
}

