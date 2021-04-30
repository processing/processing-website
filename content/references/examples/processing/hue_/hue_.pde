size(400, 400);
noStroke();
colorMode(HSB, 255);
color c = color(0, 126, 255);
fill(c);
rect(60, 80, 140, 240);
float value = hue(c);  // Sets 'value' to "0"
fill(value);
rect(200, 80, 140, 240);