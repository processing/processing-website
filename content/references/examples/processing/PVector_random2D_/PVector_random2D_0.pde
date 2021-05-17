PVector v;

void setup() {
  v = PVector.random2D();
  println(v);
  // May print something like:
  // [ -0.75006354, -0.6613658, 0.0 ] or 
  // [ 0.13742635, 0.990512, 0.0 ] or 
  // [ -0.9456181, -0.32527903, 0.0 ]
}
