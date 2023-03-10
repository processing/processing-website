size(400, 400, P3D);
PImage img = loadImage("laDefense.jpg");
noStroke();
beginShape();
texture(img);
// "laDefense.jpg" is 100x100 pixels in size so
// the values 0 and 400 are used for the
// parameters "s" and "t" to map it directly
// to the vertex points
vertex(40, 80, 0, 0);
vertex(320, 20, 100, 0);
vertex(380, 360, 100, 100);
vertex(160, 380, 0, 100);
endShape();