String s1 = "Have you ever heard of a thing called fluoridation. "; 
       s1 += "Fluoridation of water?";
String s2 = "Uh? Yes, I-I have heard of that, Jack, yes. Yes.";

String[] m1 = match(s1, "fluoridation");
if (m1 != null) {  // If not null, then a match was found
  // This will print to the console, since a match was found.
  println("Found a match in '" + s1 + "'");  
} else {
  println("No match found in '" + s1 + "'");
}

String[] m2 = match(s2, "fluoridation");
if (m2 != null) {
  println("Found a match in '" + s2 + "'");
} else {
  // This will print to the console, since no match was found.
  println("No match found in '" + s2 + "'");  
}
