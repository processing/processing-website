size(400, 400);

ellipse(0, 200, 132, 132);  // Left circle

pushStyle();  // Start a new style
strokeWeight(40);
fill(204, 153, 0);
ellipse(200, 200, 132, 132);  // Middle circle
popStyle();  // Restore original style

ellipse(400, 200, 132, 132);  // Right circle