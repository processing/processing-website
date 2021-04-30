String[] animals = new String[3]; 
animals[0] = "cat"; 
animals[1] = "seal"; 
animals[2] = "bear"; 
String joinedAnimals = join(animals, " : "); 
println(joinedAnimals);  // Prints "cat : seal : bear" 

// Joining an array of ints requires first
// converting to an array of Strings
int[] numbers = new int[3]; 
numbers[0] = 8; 
numbers[1] = 67; 
numbers[2] = 5; 
String joinedNumbers = join(nf(numbers, 0), ", "); 
println(joinedNumbers);  // Prints "8, 67, 5" 

