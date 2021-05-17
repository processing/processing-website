// Re-creates the default perspective
size(400, 400, P3D);
noFill();
float fov = PI/3.0;
float cameraZ = (height/2.0) / tan(fov/2.0);
perspective(fov, float(width)/float(height), 
            cameraZ/10.0, cameraZ*10.0);
translate(200, 200, 0);
rotateX(-PI/6);
rotateY(PI/3);
box(180);