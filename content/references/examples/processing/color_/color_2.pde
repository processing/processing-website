color c;  // Declare color 'c'
noStroke();  // Don't draw a stroke around shapes

// If no colorMode is specified, then the
// default of RGB with scale of 0-255 is used.
c = color(50, 55, 100);  // Create a color for 'c'
fill(c);  // Use color variable 'c' as fill color
rect(0, 40, 180, 320);  // Draw left rect

colorMode(HSB, 100);  // Use HSB with scale of 0-100
c = color(50, 55, 100);  // Update 'c' with new color
fill(c);  // Use updated 'c' as fill color
rect(220, 40, 180, 320);  // Draw right rect