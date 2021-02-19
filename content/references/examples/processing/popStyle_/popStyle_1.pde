size(400, 400);

ellipse(0, 200, 132, 132);  // Left circle

pushStyle();  // Start a new style
strokeWeight(40);
fill(204, 153, 0);
ellipse(132, 200, 132, 132);  // Left-middle circle

pushStyle();  // Start another new style
stroke(0, 102, 153);
ellipse(264, 200, 132, 132);  // Right-middle circle
popStyle();  // Restore the previous style

popStyle();  // Restore original style

ellipse(400, 200, 132, 132);  // Right circle