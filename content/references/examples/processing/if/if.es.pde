for (int i = 5; i < height; i += 5) {
  stroke(255);   // Agregamos el color Blanco
  if (i < 35) {  // When 'i' is less than 35...
    stroke(0);   //...set the color to black
  }
  line(30, i, 80, i);
}
