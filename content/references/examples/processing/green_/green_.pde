size(400, 400);
color c = color(20, 75, 200);  // Define color 'c'
fill(c);  // Use color variable 'c' as fill color
rect(60, 80, 140, 240);  // Draw left rectangle

float greenValue = green(c);  // Get green in 'c'
println(greenValue);  // Print "75.0"
fill(0, greenValue, 0);  // Use 'greenValue' in new fill
rect(200, 80, 140, 240);  // Draw right rectangle