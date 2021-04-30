IntList inventory;

void setup() {
  size(200, 200);
  inventory = new IntList();
  inventory.append(84);
  inventory.append(15);
  inventory.append(102);
  println(inventory);
  if (inventory.hasValue(15) == true) {
    println("Yes, we have a '15'"); 
  } else {
    println("Sorry, no '15'");
  }
}

