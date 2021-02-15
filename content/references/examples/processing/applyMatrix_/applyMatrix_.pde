size(400, 400, P3D);
noFill();
translate(200, 200, 0);
rotateY(PI/6); 
stroke(153);
box(140);
// Set rotation angles
float ct = cos(PI/9.0);
float st = sin(PI/9.0);          
// Matrix for rotation around the Y axis
applyMatrix(  ct, 0.0,  st,  0.0,
             0.0, 1.0, 0.0,  0.0,
             -st, 0.0,  ct,  0.0,
             0.0, 0.0, 0.0,  1.0);  
stroke(255);
box(200);