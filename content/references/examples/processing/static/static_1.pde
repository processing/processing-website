void setup() {
  println(MiniClass.add(3, 4));  // Prints "7" to the console
}

static class MiniClass {
  static int add(int x, int y) {
    return(x + y);
  } 
}
