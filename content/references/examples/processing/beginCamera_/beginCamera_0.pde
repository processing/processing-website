size(400, 400, P3D);
noFill();

beginCamera();
camera();
rotateX(-PI/6);
endCamera();

translate(200, 200, 0);
rotateY(PI/3);
box(180);

