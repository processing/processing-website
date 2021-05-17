// Static (return a new vector)

PVector start;
PVector end;
PVector middle;

void setup() {
  start = new PVector(0.0, 0.0);
  end = new PVector(100.0, 100.0);
  middle = PVector.lerp(start, end, 0.5);
  println(middle);  // Prints "[ 50.0, 50.0, 0.0 ]"
}
