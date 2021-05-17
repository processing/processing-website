size(400, 400);

fill(255);
rect(0, 0, 200, 200);  // White rectangle

pushMatrix();
translate(120, 80);
fill(0);  
rect(0, 0, 200, 200);  // Black rectangle
popMatrix();

fill(100);  
rect(60, 40, 200, 200);  // Gray rectangle