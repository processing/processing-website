size(400,400);
translate(200, 200);
stroke(255, 0, 0);
beginShape();
// Exterior part of shape, clockwise winding
vertex(-160, -160);
vertex(160, -160);
vertex(160, 160);
vertex(-160, 160);
// Interior part of shape, counter-clockwise winding
beginContour();
vertex(-80, -80);
vertex(-80, 80);
vertex(80, 80);
vertex(80, -80);
endContour();
endShape(CLOSE);
