Table table;

void setup() {

  table = new Table();

  table.addColumn("name");
  table.addColumn("type");

  TableRow newRow = table.addRow();
  newRow.setString("name", "   Lion");
  newRow.setString("type", "Mammal");

  newRow = table.addRow();
  newRow.setString("name", "Snake  ");
  newRow.setString("type", "Reptile");

  newRow = table.addRow();
  newRow.setString("name", "  Mosquito  ");
  newRow.setString("type", "Insect");
  
  println(table.getStringColumn("name"));
  
  table.trim();
  
  println(table.getStringColumn("name"));
}

// Sketch prints:
// [0] "   Lion"
// [1] "Snake  "
// [2] "  Mosquito  "
// [0] "Lion"
// [1] "Snake"
// [2] "Mosquito"
