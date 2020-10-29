float[] randoms = new float[100];
for (int i = 0; i < randoms.length; i++) {
  randoms[i] = random(100);
}

// You can also use an enhanced loop
// to access the elements of an array
for (float val : randoms) {
  println(val);
}

// This works with arrays of objects, too,
// but not when first making the array
PVector[] vectors = new PVector[5];
for (int i = 0; i < vectors.length; i++) {
  vectors[i] = new PVector();
}

// The syntax only applies when iterating
// over an existing array 
for (PVector v : vectors) {
  point(v.x, v.y);
}
