void setup() {
  int i = 12;
  println(log(i));
  println(log10(i));
}

// Calculates the base-10 logarithm of a number
float log10 (int x) {
  return (log(x) / log(10));
}
