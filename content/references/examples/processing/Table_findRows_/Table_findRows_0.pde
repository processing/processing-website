Table table;

void setup() {

  table = new Table();

  table.addColumn("name");
  table.addColumn("type");

  TableRow newRow = table.addRow();
  newRow.setString("name", "Lion");
  newRow.setString("type", "Mammal");

  newRow = table.addRow();
  newRow.setString("name", "Snake");
  newRow.setString("type", "Reptile");

  newRow = table.addRow();
  newRow.setString("name", "Mosquito");
  newRow.setString("type", "Insect");

  newRow = table.addRow();
  newRow.setString("name", "Lizard");
  newRow.setString("type", "Reptile");

  for (TableRow row : table.findRows("Reptile", "type")) {
    println(row.getString("name") + ": " + row.getString("type"));
  }
}

// Sketch prints:
// Snake: Reptile
// Lizard: Reptile
