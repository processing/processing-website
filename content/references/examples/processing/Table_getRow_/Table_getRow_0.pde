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
  
  TableRow row = table.getRow(2);
  println(row.getString("name"));  // Prints "Mosquito"
  row.setString("name", "Ladybug");
  println(row.getString("name"));  // Prints "Ladybug"
}
