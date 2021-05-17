Table table;

void setup() {

  table = new Table();
  
  table.addColumn("name");
  table.addColumn("type");

  TableRow newRow = table.addRow();
  newRow.setString("name", "Lion");
  newRow.setString("type", "Mammal");
  println(table.getRowCount());  // Prints 1

  table.removeRow(0);  // Removes the first row
  println(table.getRowCount());  // Prints 0
}
