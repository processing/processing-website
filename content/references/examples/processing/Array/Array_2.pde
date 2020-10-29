int degrees = 360;
float[] cos_vals = new float[degrees];
// Use a for() loop to quickly iterate
// through all values in an array.
for (int i=0; i < degrees; i++) {         
  cos_vals[i] = cos(TWO_PI/degrees * i);
}
