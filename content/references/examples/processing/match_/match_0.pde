String s = "Inside a tag, you will find <tag>content</tag>.";
String[] m = match(s, "<tag>(.*?)</tag>");
println("Found '" + m[1] + "' inside the tag.");
// Prints to the console:
// "Found 'content' inside the tag."
