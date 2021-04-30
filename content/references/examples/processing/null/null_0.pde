String content = "It is a beautiful day.";
String[] results;  // Declare empty String array

results = match(content, "orange");
// The match statement above will fail to find
// the word "orange" in the String 'content', so
// it will return a null value to 'results'.

if (results == null) {
  println("Value of 'results' is null.");  // This line is printed
} else {
  println("Value of 'results' is not null!");  // This line is not printed
}
