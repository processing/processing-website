int[] vals = {10, 20, 30}; 
  
void draw() { 
  int[] t = timestwo(vals); 
  println(t); 
  noLoop();
} 
 
int[] timestwo(int[] dVals) { 
  for (int i = 0; i < dVals.length; i++) { 
    dVals[i] = dVals[i] * 2; 
  } 
  return dVals;  // Returns an array of 3 ints: 20, 40, 60 
}
