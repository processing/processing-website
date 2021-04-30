String[] lines = loadStrings("http://processing.org/about/index.html");
println("there are " + lines.length + " lines");
for (int i = 0 ; i < lines.length; i++) {
  println(lines[i]);
}
