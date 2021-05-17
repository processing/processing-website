size(400, 400, P3D); 
int concentration = 600;  // Try 1 -> 10000
background(0); 
noStroke(); 
spotLight(51, 102, 126, 200, 200, 1600, 
          0, 0, -1, PI/16, concentration); 
translate(320, 200, 0); 
sphere(120);