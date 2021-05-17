PVector v;

void setup() {
  size(100, 100);
  v = new PVector(20.0, 30.0, 40.0);
  println(v.x);  // Prints "20.0"
  println(v.y);  // Prints "30.0"
  println(v.z);  // Prints "40.0"
  v.x = 50.0; 
  println(v.x);  // Prints "50.0"
}
