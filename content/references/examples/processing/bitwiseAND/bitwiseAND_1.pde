color argb = color(204, 204, 51, 255);
// The sytax "& 0xFF" compares the binary
// representation of the two values and
// makes all but the last 8 bits into a 0.
// "0xFF" is 00000000000000000000000011111111
int a = argb >> 24 & 0xFF;
int r = argb >> 16 & 0xFF;
int g = argb >> 8 & 0xFF;
int b = argb & 0xFF;
fill(r, g, b, a);
rect(30, 20, 55, 55);
