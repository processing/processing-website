size(400, 400);

// Text to display. The "\n" is a "new line" character
String lines = "L1\nL2\nL3";
textSize(48);
fill(0);  // Set fill to black

textLeading(40);  // Set leading to 40
text(lines, 40, 100);

textLeading(80);  // Set leading to 80
text(lines, 160, 100);

textLeading(120);  // Set leading to 120
text(lines, 280, 100);