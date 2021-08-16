// The following short XML file called "positions.xml" is parsed
// in the code below. It must be in the project's "data" folder.
//
// <?xml version="1.0"?>
// <positions>
//   <position id="0">128.111</position>
//   <position id="1">256.222</position>
//   <position id="2">512.333</position>
// </positions>

XML xml;

void setup() {
  xml = loadXML("positions.xml");
  XML firstChild = xml.getChild("position");
  println(firstChild.getFloatContent());
}

// Sketch prints:
// 128.111
