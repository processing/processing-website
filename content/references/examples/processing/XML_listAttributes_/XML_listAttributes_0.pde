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
  XML firstChild = xml.getChild("animal");
  println(firstChild.listAttributes());
}

// Sketch prints:
// [0] "id"
// [1] "species"
