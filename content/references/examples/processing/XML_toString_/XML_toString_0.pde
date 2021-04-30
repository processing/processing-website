String data = "&lt;mammals&gt;&lt;animal&gt;Goat&lt;/animal&gt;&lt;/mammals&gt;";

void setup() {
  XML xml = parseXML(data);
  
  //Format with line breaks, XML declaration, and 2-space indentation
  String s = xml.toString();
  println(s);
}

// Sketch prints:
//&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
//&lt;mammals&gt;
//  &lt;animal&gt;Goat&lt;/animal&gt;
//&lt;/mammals&gt;
