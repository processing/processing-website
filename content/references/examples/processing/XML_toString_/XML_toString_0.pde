String data = "<mammals><animal>Goat</animal></mammals>";

void setup() {
  XML xml = parseXML(data);
  
  //Format with line breaks, XML declaration, and 2-space indentation
  String s = xml.toString();
  println(s);
}

// Sketch prints:
//<?xml version="1.0" encoding="UTF-8"?>
//<mammals>
//  <animal>Goat</animal>
//</mammals>
