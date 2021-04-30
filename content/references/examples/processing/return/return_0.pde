int val = 30;
 
void draw() {
  int t = timestwo(val);
  println(t);
}

// The first 'int' in the function declaration
// specifies the type of data to be returned.
int timestwo(int dVal) {
  dVal = dVal * 2;
  return dVal;  // Returns an int of 60, in this case
}
