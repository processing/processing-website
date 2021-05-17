PVector v;
float[] vvv = { 20.0, 30.0, 40.0 };

void setup() {
  size(100, 100);
  v = new PVector(0.0, 0.0, 0.0);
  v.set(vvv);
  println(v.x);  // Prints "20.0"
  println(v.y);  // Prints "30.0"
  println(v.z);  // Prints "40.0"
}
