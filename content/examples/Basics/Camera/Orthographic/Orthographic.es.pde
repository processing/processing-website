/**
 * Perspective vs. Ortho
 *
 * Mueve el mouse de izquierda a derecha para cambiar el parámetro "far"
 * de las funciones perspective() y ortho().
 * Este parámetro fija la distancia máxima desde el origen
 * al espectador y cortará la geometría.
 * Haz click en un botón del mouse para alternar entre proyecciones
 * en perspectiva y ortográfica.
 */


boolean showPerspective = false;

void setup() {
  size(600, 360, P3D);
  noFill();
  fill(255);
  noStroke();
}

void draw() {
  lights();
  background(0);
  float far = map(mouseX, 0, width, 120, 400);
  if (showPerspective == true) {
    perspective(PI/3.0, float(width)/float(height), 10, far);
  } else {
    ortho(-width/2.0, width/2.0, -height/2.0, height/2.0, 10, far);
  }
  translate(width/2, height/2, 0);
  rotateX(-PI/6);
  rotateY(PI/3);
  box(180);
}

void mousePressed() {
  showPerspective = !showPerspective;
}

