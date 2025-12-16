/**
 * Condicionales 1.
 *
 * Las condiciones son como preguntas.
 * Ellas permiten al programa decidir una acción si
 * la respuesta a una pregunta es \"true\" (verdadera) o realizar otra acción
 * si la respuesta es \"false.\" (false)
 * Las preguntas hechas son siempre sentencias lógicas o relacionales.
 * Por ejemplo, si la variable 'i' es
 * igual a cero entonces dibuja una línea.
 */

size(640, 360);
background(0);

for(int i = 10; i < width; i += 10) {
  // Si 'i' divide entre 20 sin residuo dibuja
  // la primera línea, de lo contrario dibuja la segunda línea
  if((i % 20) == 0) {
    stroke(255);
    line(i, 80, i, height/2);
  } else {
    stroke(153);
    line(i, 20, i, 180);
  }
}
