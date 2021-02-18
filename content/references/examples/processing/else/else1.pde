for (int i = 20; i < 380; i += 20) {
  if (i < 140) {
    line(120, i, 320, i);
  } else if (i < 260) {
    line(80, i, 360, i);
  } else {
    line(0, i, 400, i);
  }
}