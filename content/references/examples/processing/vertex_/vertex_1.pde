// Drawing vertices in 3D requires P3D
// as a parameter to size()
size(400, 400, P3D);
beginShape(POINTS);
strokeWeight(5);
vertex(120, 80, -200);
vertex(340, 80, -200);
vertex(340, 300, -200);
vertex(120, 300, -200);
endShape();