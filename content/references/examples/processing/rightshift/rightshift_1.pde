// Using "right shift" as a faster technique than red(), green(), and blue()
color argb = color(204, 204, 51, 255);
int a = (argb >> 24) & 0xFF;
int r = (argb >> 16) & 0xFF;  // Faster way of getting red(argb)
int g = (argb >> 8) & 0xFF;   // Faster way of getting green(argb)
int b = argb & 0xFF;          // Faster way of getting blue(argb)
fill(r, g, b, a);
rect(30, 20, 55, 55);
