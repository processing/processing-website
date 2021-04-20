String s = "Inside a tag, you will find &lt;tag&gt;content&lt;/tag&gt;.";
String[] m = match(s, "&lt;tag&gt;(.*?)&lt;/tag&gt;");
println("Found '" + m[1] + "' inside the tag.");
// Prints to the console:
// "Found 'content' inside the tag."
