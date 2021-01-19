size(100, 100, P3D);
noFill();

beginCamera();
camera();
rotateX(-PI/6);
endCamera();

translate(50, 50, 0);
rotateY(PI/3);
box(45);