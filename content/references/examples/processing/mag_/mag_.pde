size(400, 400);

float x1 = 80;
float x2 = 320;
float y1 = 120;
float y2 = 280;

line(0, 0, x1, y1);
println(mag(x1, y1));  // Prints "144.22205"
line(0, 0, x2, y1);
println(mag(x2, y1));  // Prints "341.76016"
line(0, 0, x1, y2);
println(mag(x1, y2));  // Prints "291.2044"
line(0, 0, x2, y2);
println(mag(x2, y2));  // Prints "425.20584"