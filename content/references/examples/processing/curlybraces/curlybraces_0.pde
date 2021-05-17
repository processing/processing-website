int[] a = { 5, 20, 25, 45, 70 };

void setup() {
  size(100, 100);
}

void draw() {
  for (int i=0; i < a.length; i++) {
    line(0, a[i], 50, a[i]);
  }
}
