// The following short XML file called "mammals.xml" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// &lt;?xml version=&quot;1.0&quot;?&gt;
// &lt;mammals&gt;
//   &lt;animal id=&quot;0&quot; species=&quot;Capra hircus&quot;&gt;Goat&lt;/animal&gt;
//   &lt;animal id=&quot;1&quot; species=&quot;Panthera pardus&quot;&gt;Leopard&lt;/animal&gt;
//   &lt;animal id=&quot;2&quot; species=&quot;Equus zebra&quot;&gt;Zebra&lt;/animal&gt;
// &lt;/mammals&gt;

XML xml;

void setup() {
  xml = loadXML("mammals.xml");
  
  //Format without line breaks and no indentation
  String s = xml.format(-1);
  println(s);
  println("");  // Blank line
  
  //Format with line breaks and no indentation
  s = xml.format(0);
  println(s);
  
  //Format with line breaks and 5 spaces of indentation
  s = xml.format(5);
  println(s);
}

// Sketch prints:
//&lt;mammals&gt;&lt;animal id=&quot;0&quot; species=&quot;Capra hircus&quot;&gt;Goat&lt;/animal&gt;
  &lt;animal id=&quot;1&quot; species=&quot;Panthera pardus&quot;&gt;Leopard&lt;/animal&gt;
  &lt;animal id=&quot;2&quot; species=&quot;Equus zebra&quot;&gt;Zebra&lt;/animal&gt;&lt;/mammals&gt;
//
//&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
//&lt;mammals&gt;
//&lt;animal id=&quot;0&quot; species=&quot;Capra hircus&quot;&gt;Goat&lt;/animal&gt;
//&lt;animal id=&quot;1&quot; species=&quot;Panthera pardus&quot;&gt;Leopard&lt;/animal&gt;
//&lt;animal id=&quot;2&quot; species=&quot;Equus zebra&quot;&gt;Zebra&lt;/animal&gt;
//&lt;/mammals&gt;
//
//&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
//&lt;mammals&gt;
//     &lt;animal id=&quot;0&quot; species=&quot;Capra hircus&quot;&gt;Goat&lt;/animal&gt;
//     &lt;animal id=&quot;1&quot; species=&quot;Panthera pardus&quot;&gt;Leopard&lt;/animal&gt;
//     &lt;animal id=&quot;2&quot; species=&quot;Equus zebra&quot;&gt;Zebra&lt;/animal&gt;
//&lt;/mammals&gt;
