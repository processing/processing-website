// The following short XML file called "mammals.xml" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// <?xml version="1.0"?>
// <mammals>
//   <animal id="0" species="Capra hircus">Goat</animal>
//   <animal id="1" species="Panthera pardus">Leopard</animal>
//   <animal id="2" species="Equus zebra">Zebra</animal>
// </mammals>

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
//<mammals><animal id="0" species="Capra hircus">Goat</animal>
  <animal id="1" species="Panthera pardus">Leopard</animal>
  <animal id="2" species="Equus zebra">Zebra</animal></mammals>
//
//<?xml version="1.0" encoding="UTF-8"?>
//<mammals>
//<animal id="0" species="Capra hircus">Goat</animal>
//<animal id="1" species="Panthera pardus">Leopard</animal>
//<animal id="2" species="Equus zebra">Zebra</animal>
//</mammals>
//
//<?xml version="1.0" encoding="UTF-8"?>
//<mammals>
//     <animal id="0" species="Capra hircus">Goat</animal>
//     <animal id="1" species="Panthera pardus">Leopard</animal>
//     <animal id="2" species="Equus zebra">Zebra</animal>
//</mammals>
