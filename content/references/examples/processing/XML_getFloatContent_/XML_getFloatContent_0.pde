// The following short XML file called "positions.xml" is parsed
// in the code below. It must be in the project's "data" folder.
//
// &lt;?xml version=&quot;1.0&quot;?&gt;
// &lt;positions&gt;
//   &lt;position id="0"&gt;128.111&lt;/position&gt;
//   &lt;position id="1"&gt;256.222&lt;/position&gt;
//   &lt;position id="2"&gt;512.333&lt;/position&gt;
// &lt;/positions&gt;

XML xml;

void setup() {
  xml = loadXML("positions.xml");
  XML firstChild = xml.getChild("position");
  println(firstChild.getFloatContent());
}

// Sketch prints:
// 128.111
