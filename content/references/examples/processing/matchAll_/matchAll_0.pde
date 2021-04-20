String s = "Inside tags, you will find &lt;tag&gt;multiple&lt;/tag&gt; ";
       s += "&lt;tag&gt;pieces&lt;/tag&gt; of &lt;tag&gt;content&lt;/tag&gt;.";

String[][] m = matchAll(s, "&lt;tag&gt;(.*?)&lt;/tag&gt;");
for (int i = 0; i < m.length; i++) {
  println("Found '" + m[i][1] + "' inside a tag.");
}

// Prints to the console:
// "Found 'multiple' inside a tag."
// "Found 'pieces' inside a tag."
// "Found 'content' inside a tag."
