/**
 * Arreglo 2D.
 *
 * Demuestra la sintaxis para crear un arreglo bidimensional (2D).
 * Valores en un arreglo bidimensional son accesados usando dos valores de índices.
 * Los arreglos bidimensionales son útiles para almacenar imágenes. En este ejemplo cada punto
 * esta coloreado en relación a su distancia desde el centro de la imagen.
 */

float[][] distances;
float maxDistance;
int spacer;

void setup() {
  size(640, 360);
  maxDistance = dist(width/2, height/2, width, height);
  distances = new float[width][height];
  for (int y = 0; y < height; y++) {
    for (int x = 0; x < width; x++) {
      float distance = dist(width/2, height/2, x, y);
      distances[x][y] = distance/maxDistance * 255;
    }
  }
  spacer = 10;
  strokeWeight(6);
  noLoop();  // Se ejecuta una vez y para.
}

void draw() {
  background(0);
  // este ciclo brinca sobre los valores en los arreglos basados en la variable, hay más valores
  // en el arreglo que los dibujados aquí
  // Cambia el valor de la variable spacer para
  // cambiar la densidad de los pixeles
  for (int y = 0; y < height; y += spacer) {
    for (int x = 0; x < width; x += spacer) {
      stroke(distances[x][y]);
      point(x + spacer/2, y + spacer/2);
    }
  }
}
