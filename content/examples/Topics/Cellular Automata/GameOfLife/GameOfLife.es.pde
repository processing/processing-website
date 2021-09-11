/**
 * Game of Life
 * by Joan Soler-Adillon.
 *
 * Presiona la barra espaciadora para pausar y cambiar los valores de las celdas con el ratón.
 * Cuando esta pausado, haz click para activar/desactivar una celda.
 * Presiona 'R' para reiniciar aleatoriamente la cuadrilla de celdas.
 * Presiona 'C' para limpiar todas las celdas.
 * El Juego de la Vida fue creado originalmente por John Conway en 1970.
 */

// Tamaño de la celda
int cellSize = 5;

// Probabilidad de una celda de estar viva al inicio (en porcentaje)
float probabilityOfAliveAtStart = 15;

// Variables para el tiempo
int interval = 100;
int lastRecordedTime = 0;

// Colores de celdas activas/inactivas
color alive = color(0, 200, 0);
color dead = color(0);

// Arreglo de celdas
int[][] cells;
// Buffer para almacenar el estado de las celdas y usarlo
//mientras se cambian otras en las interacciones
int[][] cellsBuffer;

// Pausa
boolean pause = false;

void setup() {
  size (640, 360);

  // Instanciar arreglos
  cells = new int[width/cellSize][height/cellSize];
  cellsBuffer = new int[width/cellSize][height/cellSize];

  // El trazo pintara el fondo de la rejilla
  stroke(48);

  noSmooth();

  // Initialización de celdas.
  for (int x=0; x<width/cellSize; x++) {
    for (int y=0; y<height/cellSize; y++) {
      float state = random (100);
      if (state > probabilityOfAliveAtStart) {
        state = 0;
      }
      else {
        state = 1;
      }
      cells[x][y] = int(state); // Save state of each cell
    }
  }
  // Llenar de negro en el caso de que las celdas no cubran toda la pantalla
  background(0);
}


void draw() {

  //Dibujar rejilla
  for (int x=0; x<width/cellSize; x++) {
    for (int y=0; y<height/cellSize; y++) {
      if (cells[x][y]==1) {
        fill(alive); // si esta vivo
      else {
        fill(dead); // si esta muerto
      }
      rect (x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
  // Iterar en cada nuevo tick del reloj
  if (millis()-lastRecordedTime>interval) {
    if (!pause) {
      iteration();
      lastRecordedTime = millis();
    }
  }

  // Crear nuevas celdas en la pausa
  if (pause && mousePressed) {
    // checar si la posición es válida
    int xCellOver = int(map(mouseX, 0, width, 0, width/cellSize));
    xCellOver = constrain(xCellOver, 0, width/cellSize-1);
    int yCellOver = int(map(mouseY, 0, height, 0, height/cellSize));
    yCellOver = constrain(yCellOver, 0, height/cellSize-1);

    // Comprobar contra las celdas en el buffer
    if (cellsBuffer[xCellOver][yCellOver]==1) { // Celda viva
      cells[xCellOver][yCellOver]=0; // Matar
      fill(dead); // Actualizar color a muerto
    }
    else { // Celda esta muerta
      cells[xCellOver][yCellOver]=1; // Revivir
      fill(alive); // Actualizar color a vivo
    }
  }
  else if (pause && !mousePressed) { // And then save to buffer once mouse goes up
    // Save cells to buffer (so we opeate with one array keeping the other intact)
    for (int x=0; x<width/cellSize; x++) {
      for (int y=0; y<height/cellSize; y++) {
        cellsBuffer[x][y] = cells[x][y];
      }
    }
  }
}

void iteration() { // When the clock ticks
  // Save cells to buffer (so we opeate with one array keeping the other intact)
  for (int x=0; x<width/cellSize; x++) {
    for (int y=0; y<height/cellSize; y++) {
      cellsBuffer[x][y] = cells[x][y];
    }
  }

  // Visit each cell:
  for (int x=0; x<width/cellSize; x++) {
    for (int y=0; y<height/cellSize; y++) {
      // And visit all the neighbours of each cell
      int neighbours = 0; // We'll count the neighbours
      for (int xx=x-1; xx<=x+1;xx++) {
        for (int yy=y-1; yy<=y+1;yy++) {
          if (((xx>=0)&&(xx<width/cellSize))&&((yy>=0)&&(yy<height/cellSize))) { // Make sure you are not out of bounds
            if (!((xx==x)&&(yy==y))) { // Make sure to to check against self
              if (cellsBuffer[xx][yy]==1){
                neighbours ++; // Check alive neighbours and count them
              }
            } // End of if
         } // Fin del if
        } // Fin de ciclo y
      } // Fin de ciclo x
      // Se han checado vecindades, aplicar las reglas.
      if (cellsBuffer[x][y]==1) { // Celda viva, matarla si es necesario
        if (neighbours < 2 || neighbours > 3) {
          cells[x][y] = 0; // Morir a menos que tenga 2 o 3 vecinos
        }
      }
      else { // Celda muerta, revivir si es necesario
        if (neighbours == 3 ) {
          cells[x][y] = 1; // Sólo si tiene 3 vecinos
        }
      } // Fin del if
    } // Fin de ciclo y
  } // Fin de ciclo x
} // Fin de función

void keyPressed() {
  if (key=='r' || key == 'R') {
    // Reinicio: reinicializar las celdas
    for (int x=0; x<width/cellSize; x++) {
      for (int y=0; y<height/cellSize; y++) {
        float state = random (100);
        if (state > probabilityOfAliveAtStart) {
          state = 0;
        }
        else {
          state = 1;
        }
        cells[x][y] = int(state); // Guardar el estado de cada celda
      }
    }
  }
  if (key==' ') { // Alternar la pausa
    pause = !pause;
  }
  if (key=='c' || key == 'C') { // Clear all
    for (int x=0; x<width/cellSize; x++) {
      for (int y=0; y<height/cellSize; y++) {
        cells[x][y] = 0; // Poner todo a o
      }
    }
  }
}
