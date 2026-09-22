size(400, 400, P3D);
pixelDensity(2);
noFill();
ortho(-width/2, width/2, -height/2, height/2); // Same as ortho()
translate(width/2, height/2, 0);
rotateX(-PI/6);
rotateY(PI/3);
box(180);
