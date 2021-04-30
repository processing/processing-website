size(400, 400);
float base = height * 0.75;
float scalar = 0.8; // Different for each font

textSize(128);  // Set initial text size
float a = textAscent() * scalar;  // Calc ascent
line(0, base-a, width, base-a);
text("dp", 0, base);  // Draw text on baseline

textSize(256);  // Increase text size
a = textAscent() * scalar;  // Recalc ascent
line(160, base-a, width, base-a);
text("dp", 160, base);  // Draw text on baseline