void setup() {
  MiniClass mc1 = new MiniClass();
  MiniClass mc2 = new MiniClass();
  println( mc1.y );   // Prints "10" to the console
  MiniClass.y += 10;  // The 'y' variable is shared by 'mc1' and 'mc2'
  println( mc1.y );   // Prints "20" to the console
  println( mc2.y );   // Prints "20" to the console
}

static class MiniClass {
  static int y = 10;  // Class variable
}
