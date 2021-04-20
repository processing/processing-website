PVector v;

void setup() {
  v = new PVector(10.0, 20.0);
  println(v);  // Prints "[ 10.0, 20.0, 0.0 ]"
  v.rotate(HALF_PI);
  println(v);  // Prints "[ -20.0, 9.999999, 0.0 ]"
}
