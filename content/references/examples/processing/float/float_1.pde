float f1 = 0.0;
for (int i = 0 ; i < 100000; i++) {  
  f1 = f1 + 0.0001;  // Bad idea! See below.
}
println(f1);

float f2 = 0.0;
for (int i = 0; i < 100000; i++) {
  // The variable 'f2' will work better here, less affected by rounding
  f2 = i / 1000.0;  // Count by thousandths
}
println(f2);
