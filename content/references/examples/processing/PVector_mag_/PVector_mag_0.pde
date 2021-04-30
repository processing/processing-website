PVector v;

void setup() {
  size(100, 100);
  v = new PVector(20.0, 30.0, 40.0);
  float m = v.mag();
  println(m);  // Prints "53.851646"
}
