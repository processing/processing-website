PVector v1 = new PVector(10, 20, 2);
PVector v2 = new PVector(60, 80, 6); 
PVector v3 = v1.cross(v2);
println(v3);  // Prints "[ -40.0, 60.0, -400.0 ]"
