size(400, 400);

color c = color(255, 204, 0);  // Define color 'c'
fill(c);  // Use color variable 'c' as fill color
rect(60, 80, 140, 240);  // Draw left rectangle
  
float redValue = red(c);  // Get red in 'c'
println(redValue);  // Print "255.0"
fill(redValue, 0, 0);  // Use 'redValue' in new fill
rect(200, 80, 140, 240);  // Draw right rectangle