StringList inventory;

void setup() {
  size(200, 200);
  inventory = new StringList();
  inventory.append("coffee");
  inventory.append("flour");
  inventory.append("tea");
  println(inventory);
  if (inventory.hasValue("tea")) {
    println("Yes, we have tea"); 
  } else {
    println("Sorry, no tea");
  }
}

