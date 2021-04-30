size(400, 400, P3D); 
background(0);
noStroke();
background(0); 
fill(0, 51, 102); 
ambientLight(102, 102, 102);
lightSpecular(204, 204, 204);
directionalLight(102, 102, 102, 0, 0, -1);
specular(255, 255, 255);
translate(120, 200, 0);
shininess(1.0);
sphere(80);  // Left sphere
translate(160, 0, 0); 
shininess(5.0); 
sphere(80);  // Right sphere