char letter = 'B';

switch(letter) {
  case 'A': 
    println("Alpha");  // Does not execute
    break;
  case 'B': 
    println("Bravo");  // Prints "Bravo"
    break;
  default:
    println("Zulu");   // Does not execute
    break;
}
