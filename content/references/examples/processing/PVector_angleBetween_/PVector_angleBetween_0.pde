PVector v1 = new PVector(10, 20);
PVector v2 = new PVector(60, 80); 
float a = PVector.angleBetween(v1, v2);
println(degrees(a));  // Prints "10.304827"
