// Removing a "break" enables testing
// for more than one value at once

char letter = 'b';

switch(letter) {
  case 'a':
  case 'A': 
    println("Alpha");  // Does not execute
    break;
  case 'b':
  case 'B': 
    println("Bravo");  // Prints "Bravo"
    break;
}
