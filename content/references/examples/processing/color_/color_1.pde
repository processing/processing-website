color c = color(255, 204, 0);  // Define color 'c'
fill(c);  // Use color variable 'c' as fill color
noStroke();  // Don't draw a stroke around shapes
ellipse(100, 100, 320, 320);  // Draw left circle

// Using only one value with color()
// generates a grayscale value.
c = color(65);  // Update 'c' with grayscale value
fill(c);  // Use updated 'c' as fill color
ellipse(300, 300, 320, 320);  // Draw right circle