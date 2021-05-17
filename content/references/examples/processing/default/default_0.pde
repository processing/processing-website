char letter = 'F';

switch(letter) {
  case 'A': 
    println("Alpha");  // Does not execute
    break;
  case 'B': 
    println("Bravo");  // Does not execute
    break;
  default:
    println("Zulu");   // Prints "Zulu"
    break;
}
