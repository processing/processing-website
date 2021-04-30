int a = 0;
void draw() {
  background(200);
  a = (a + 1) % width;  // 'a' increases between 0 and width 
  line(a, 0, a, height);
}
