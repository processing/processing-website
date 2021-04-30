PVector v;

void setup() {
  v = PVector.random3D();
  println(v);
  // May print something like:
  // [ 0.61554617, -0.51195765, 0.599168 ] or 
  // [ -0.4695841, -0.14366731, -0.8711202 ] or 
  // [ 0.6091097, -0.22805278, -0.7595902 ]
}
