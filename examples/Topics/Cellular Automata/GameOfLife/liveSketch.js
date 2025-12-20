/**
 * A Processing implementation of Game of Life
 * By Joan Soler-Adillon
 *
 * Press SPACE BAR to pause and change the cell's values with the mouse
 * On pause, click to activate/deactivate cells
 * Press R to randomly reset the cells' grid
 * Press C to clear the cells' grid
 *
 * The original Game of Life was created by John Conway in 1970.
 */

function runLiveSketch(s) {
  // Size of cells
  var cellSize = 5;

  // How likely for a cell to be alive at start (in percentage)
  var probabilityOfAliveAtStart = 15;

  // Variables for timer
  var interval = 100;
  var lastRecordedTime = 0;

  // Colors for active/inactive cells
  var alive; // = color(0, 200, 0);
  var dead; // = color(0);

  // Array of cells
  var cells;
  // Buffer to record the state of the cells and use this while changing the others in the interations
  var cellsBuffer;

  // Pause
  var pause = false;

  function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

  s.setup = () => {
    s.createCanvas(640, 360);
    alive = s.color(0, 200, 0);
    dead = s.color(0);
    // Instantiate arrays
    cells = make2DArray(s.width / cellSize, s.height / cellSize);
    cellsBuffer = make2DArray(s.width / cellSize, s.height / cellSize);

    // This stroke will draw the background grid
    s.stroke(48);

    s.noSmooth();

    // Initialization of cells
    for (var x = 0; x < s.width / cellSize; x++) {
      for (var y = 0; y < s.height / cellSize; y++) {
        var state = s.random(100);
        if (state > probabilityOfAliveAtStart) {
          state = 0;
        } else {
          state = 1;
        }
        cells[x][y] = state; // Save state of each cell
      }
    }
    s.background(0); // Fill in black in case cells don't cover all the windows
  };

  s.draw = () => {
    //Draw grid
    for (var x = 0; x < s.width / cellSize; x++) {
      for (var y = 0; y < s.height / cellSize; y++) {
        if (cells[x][y] == 1) {
          s.fill(alive); // If alive
        } else {
          s.fill(dead); // If dead
        }
        s.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    // Iterate if timer ticks
    if (s.millis() - lastRecordedTime > interval) {
      if (!pause) {
        iteration();
        lastRecordedTime = s.millis();
      }
    }

    // Create  new cells manually on pause
    if (pause && s.mouseIsPressed) {
      // Map and avoid out of bound errors
      var xCellOver = s.int(s.map(s.mouseX, 0, s.width, 0, s.width / cellSize));
      xCellOver = s.constrain(xCellOver, 0, s.width / cellSize - 1);
      var yCellOver = s.int(
        s.map(s.mouseY, 0, s.height, 0, s.height / cellSize)
      );
      yCellOver = s.constrain(yCellOver, 0, s.height / cellSize - 1);

      // Check against cells in buffer
      if (cellsBuffer[xCellOver][yCellOver] == 1) {
        // Cell is alive
        cells[xCellOver][yCellOver] = 0; // Kill
        s.fill(dead); // Fill with kill color
      } else {
        // Cell is dead
        cells[xCellOver][yCellOver] = 1; // Make alive
        s.fill(alive); // Fill alive color
      }
    } else if (pause && !s.mouseIsPressed) {
      // And then save to buffer once mouse goes up
      // Save cells to buffer (so we opeate with one array keeping the other intact)
      for (var x = 0; x < s.width / cellSize; x++) {
        for (var y = 0; y < s.height / cellSize; y++) {
          cellsBuffer[x][y] = cells[x][y];
        }
      }
    }
  };

  function iteration() {
    // When the clock ticks
    // Save cells to buffer (so we opeate with one array keeping the other intact)
    for (var x = 0; x < s.width / cellSize; x++) {
      for (var y = 0; y < s.height / cellSize; y++) {
        cellsBuffer[x][y] = cells[x][y];
      }
    }

    // Visit each cell:
    for (var x = 0; x < s.width / cellSize; x++) {
      for (var y = 0; y < s.height / cellSize; y++) {
        // And visit all the neighbours of each cell
        var neighbours = 0; // We'll count the neighbours
        for (var xx = x - 1; xx <= x + 1; xx++) {
          for (var yy = y - 1; yy <= y + 1; yy++) {
            if (
              xx >= 0 &&
              xx < s.width / cellSize &&
              yy >= 0 &&
              yy < s.height / cellSize
            ) {
              // Make sure you are not out of bounds
              if (!(xx == x && yy == y)) {
                // Make sure to to check against self
                if (cellsBuffer[xx][yy] == 1) {
                  neighbours++; // Check alive neighbours and count them
                }
              } // End of if
            } // End of if
          } // End of yy loop
        } //End of xx loop
        // We've checked the neigbours: apply rules!
        if (cellsBuffer[x][y] == 1) {
          // The cell is alive: kill it if necessary
          if (neighbours < 2 || neighbours > 3) {
            cells[x][y] = 0; // Die unless it has 2 or 3 neighbours
          }
        } else {
          // The cell is dead: make it live if necessary
          if (neighbours == 3) {
            cells[x][y] = 1; // Only if it has 3 neighbours
          }
        } // End of if
      } // End of y loop
    } // End of x loop
  } // End of function

  s.keyPressed = () => {
    if (s.key == 'r' || s.key == 'R') {
      // Restart: reinitialization of cells
      for (var x = 0; x < s.width / cellSize; x++) {
        for (var y = 0; y < s.height / cellSize; y++) {
          var state = s.random(100);
          if (state > probabilityOfAliveAtStart) {
            state = 0;
          } else {
            state = 1;
          }
          cells[x][y] = s.int(state); // Save state of each cell
        }
      }
    }
    if (s.key == ' ') {
      // On/off of pause
      pause = !pause;
    }
    if (s.key == 'c' || s.key == 'C') {
      // Clear all
      for (var x = 0; x < s.width / cellSize; x++) {
        for (var y = 0; y < s.height / cellSize; y++) {
          cells[x][y] = 0; // Save all to zero
        }
      }
    }
  };
}
