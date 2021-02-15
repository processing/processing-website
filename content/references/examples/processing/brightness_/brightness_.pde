noStroke();
colorMode(HSB, 255);
color c = color(0, 126, 255);
fill(c);
rect(60, 80, 140, 240);
float value = brightness(c);  // Sets 'value' to 255
fill(value);
rect(200, 80, 140, 240);
