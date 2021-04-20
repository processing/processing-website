StringDict inventory;

void setup() {
  size(200, 200);
  inventory = new StringDict();
  inventory.set("flour","white");
  inventory.set("coffee","black");
  inventory.set("tea","green");
  println(inventory);
  inventory.sortKeysReverse();
  println(inventory);
}

