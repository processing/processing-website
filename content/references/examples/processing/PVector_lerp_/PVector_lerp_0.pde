// Non-static (lerp on a specific vector)

PVector current;
PVector target;

void setup() {
  current = new PVector(0.0, 0.0);
  target = new PVector(100.0, 100.0);
  current.lerp(target, 0.5);
  println(current);  // Prints "[ 50.0, 50.0, 0.0 ]"
}
