for (int i = 0; i < 100; i += 10) {
  if (i == 70) {  // If 'i' is 70,
    continue;     // skip to the next iteration,
  }               // therefore not drawing the line.
  line(i, 0, i, height);
}
