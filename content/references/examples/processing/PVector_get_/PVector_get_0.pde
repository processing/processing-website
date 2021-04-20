PVector v1, v2;

void setup() {
  size(100, 100);
  v1 = new PVector(20.0, 30.0, 40.0);
  v2 = new PVector();
  v2 = v1.get();
  println(v2.x);  // Prints "20.0"
  println(v2.y);  // Prints "30.0"
  println(v2.z);  // Prints "40.0"
}
