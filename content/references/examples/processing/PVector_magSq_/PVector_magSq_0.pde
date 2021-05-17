PVector v;

void setup() {
  v = new PVector(20.0, 30.0, 40.0);
  float m = v.magSq();
  println(m);  // Prints "2900.0"
}
