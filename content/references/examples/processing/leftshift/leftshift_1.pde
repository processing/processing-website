// Packs four 8 bit numbers into one 32 bit number
int a = 255;  // Binary: 00000000000000000000000011111111
int r = 204;  // Binary: 00000000000000000000000011001100
int g = 204;  // Binary: 00000000000000000000000011001100
int b = 51;   // Binary: 00000000000000000000000000110011
a = a << 24;  // Binary: 11111111000000000000000000000000
r = r << 16;  // Binary: 00000000110011000000000000000000
g = g << 8;   // Binary: 00000000000000001100110000000000

// Equivalent to "color argb = color(r, g, b, a)" but faster
color argb = a | r | g | b;
fill(argb);
rect(30, 20, 55, 55);
