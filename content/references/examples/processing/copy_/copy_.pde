size(400,400);
PImage img = loadImage("hometown.jpg");
image(img, 0, 0, width, height);
copy(56, 176, 80, 80, 280, 200, 400, 400);
stroke(255);
noFill();
// Rectangle shows area being copied
rect(56, 176, 80, 80);