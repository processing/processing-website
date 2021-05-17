FloatList inventory;

void setup() {
  size(200, 200);
  inventory = new FloatList();
  inventory.append(108.6);
  inventory.append(5.8);
  inventory.append(8.2);
  println(inventory);
  if (inventory.hasValue(5.8) == true) {
    println("Yes, we have a '5.8'"); 
  } else {
    println("Sorry, no '5.8'");
  }
}

