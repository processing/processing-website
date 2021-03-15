size(400, 400);
for (int i = 20; i <= 380; i += 20) {
  if ((i > 140) && (i < 240)) {
    stroke(0);  // Set color to black
  } else {
    stroke(255);  // Set color to white
  }
  line(120, i, 320, i);
}