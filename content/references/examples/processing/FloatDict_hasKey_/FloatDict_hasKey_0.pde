FloatDict inventory;

void setup() {
  size(200, 200);
  inventory = new FloatDict(goods, amounts);
  inventory = new FloatDict();
  inventory.set("coffee",108.6);
  inventory.set("flour",5.8);
  inventory.set("tea",8.2);
  println(inventory);
  if (inventory.hasKey("flour") == true) {
    println("Yes, we have flour."); 
  } else {
    println("Sorry, no flour.");
  }
}

