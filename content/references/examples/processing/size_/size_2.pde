	
size(150, 200, P3D);  // Specify P3D renderer
background(153);

// With P3D, we can use z (depth) values...
line(0, 0, 0, width, height, -100);
line(width, 0, 0, width, height, -100);
line(0, height, 0, width, height, -100);

//...and 3D-specific functions, like box()
translate(width/2, height/2);
rotateX(PI/6);
rotateY(PI/6);
box(35);