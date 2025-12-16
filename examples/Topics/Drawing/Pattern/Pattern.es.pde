/**
 * Patrones.
 *
 * Mueve el cursor sobre la imagen
 * responde a la velocidad del mouse.
 */

void setup() {
  size(640, 360);
  background(102);
}

void draw() {
  // Llama al método variableEllipse() y le envía como los
  // los parámetros la posición actual del mouse
  // y la posición previa
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}


// Este método variableEllipse() fue creado específicamente
// para este programa. Calcula la velocidad del mouse
// y dibuja una elipse pequeña si el mouse se esta moviendo lento
// o una elipse grande si el raton se esta moviendo rápido

void variableEllipse(int x, int y, int px, int py) {
  float speed = abs(x-px) + abs(y-py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}
