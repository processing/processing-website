StringDict inventory;

void setup() {
  size(200, 200);
  inventory = new StringDict();
  inventory.set("coffee","black");
  inventory.set("flour","white");
  inventory.set("tea","green");
  println(inventory);noLoop();
  if (inventory.hasKey("tea") == true) {
    println("Yes, we have tea."); 
  } else {
    println("Sorry, no tea.");
  }
}

