/**
 * Arreglo.
 *
 * Un arreglo es una lista de datos. Cada elemento en la lista es
 * identificado por un número de índice, el cual representa su
 * posición en el arreglo. Los arreglos son basados en cero, lo que
 * significa que el primer elemento del arreglo es [0], el segundo
 * elemento es [1], y así sucesivamente.
 * En este ejemplo, un arreglo llamado "coswave" es creado y
 * llenado con valores de coseno. Estos datos son desplegados en 3
 * distintas formas en la pantalla.
 */


float[] coswave;

void setup() {
  size(640, 360);
  coswave = new float[width];
  for (int i = 0; i < width; i++) {
    float amount = map(i, 0, width, 0, PI);
    coswave[i] = abs(cos(amount));
  }
  background(255);
  noLoop();
}

void draw() {

  int y1 = 0;
  int y2 = height/3;
  for (int i = 0; i < width; i++) {
    stroke(coswave[i]*255);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = y1 + y1;
  for (int i = 0; i < width; i++) {
    stroke(coswave[i]*255 / 4);
    line(i, y1, i, y2);
  }

  y1 = y2;
  y2 = height;
  for (int i = 0; i < width; i++) {
    stroke(255 - coswave[i]*255);
    line(i, y1, i, y2);
  }

}
