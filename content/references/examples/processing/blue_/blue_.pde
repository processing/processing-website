color c = color(175, 100, 220);  // Define color 'c'
fill(c);  // Use color variable 'c' as fill color
rect(60, 80, 140, 240);  // Draw left rectangle

float blueValue = blue(c);  // Get blue in 'c'
println(blueValue);  // Prints "220.0"
fill(0, 0, blueValue);  // Use 'blueValue' in new fill
rect(200, 80, 140, 240);  // Draw right rectangle
