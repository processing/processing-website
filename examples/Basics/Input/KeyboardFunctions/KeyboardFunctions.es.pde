/**
 * Funciones de Teclado
 * por Martin Gomez
 *
 * Haz click en la ventana para darle el foco y presiona teclas de letras para distintos colores.
 * La función de teclado keyPressed() es llamada cada vez que una tecla es presionada.
 * keyReleased() es otra función de teclado que es llamada cuando la tecla es liberada.
 *
 * Concepto original 'Color Typewriter' por John Maeda.
 */

int maxHeight = 40;
int minHeight = 20;
int letterHeight = maxHeight; // Altura de las letras
int letterWidth = 20;          // Ancho de las letras

int x = -letterWidth;          // Posición en X de las letras
int y = 0;                     // Posición en Y de las letras

boolean newletter;

int numChars = 26;      // Hay 26 letras en el alfabeto
color[] colors = new color[numChars];

void setup() {
  size(640, 360);
  noStroke();
  colorMode(HSB, numChars);
  background(numChars/2);
  // Define un matiz por cada letra
  for(int i = 0; i < numChars; i++) {
    colors[i] = color(i, numChars, numChars);
  }
}

void draw() {
  if(newletter == true) {
    // Dibuja la letra
    int y_pos;
    if (letterHeight == maxHeight) {
      y_pos = y;
      rect( x, y_pos, letterWidth, letterHeight );
    } else {
      y_pos = y + minHeight;
      rect( x, y_pos, letterWidth, letterHeight );
      fill(numChars/2);
      rect( x, y_pos-minHeight, letterWidth, letterHeight );
    }
    newletter = false;
  }
}

void keyPressed()
{
  // Si la tecla esta entre 'A'(65) y 'Z' o 'a' to 'z'(122)
  if((key >= 'A' && key <= 'Z') || (key >= 'a' && key <= 'z')) {
    int keyIndex;
    if(key <= 'Z') {
      keyIndex = key-'A';
      letterHeight = maxHeight;
      fill(colors[keyIndex]);
    } else {
      keyIndex = key-'a';
      letterHeight = minHeight;
      fill(colors[keyIndex]);
    }
  } else {
    fill(0);
    letterHeight = 10;
  }

  newletter = true;

  // Actualiza la posición de la letra
  x = ( x + letterWidth );

  // Envuelve horizontalmente
  if (x > width - letterWidth) {
    x = 0;
    y+= maxHeight;
  }

  // Envolvemos verticalmente
  if( y > height - letterHeight) {
    y = 0;      // Ponemos y a 0
  }
}
