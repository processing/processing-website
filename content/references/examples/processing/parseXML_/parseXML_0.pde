String data = "&lt;mammals&gt;&lt;animal&gt;Goat&lt;/animal&gt;&lt;/mammals&gt;";

void setup() {
  XML xml = parseXML(data);
  if (xml == null) {
    println("XML could not be parsed.");
  } else {
    XML firstChild = xml.getChild("animal");
    println(firstChild.getContent());
  }
}

// Sketch prints:
// Goat
