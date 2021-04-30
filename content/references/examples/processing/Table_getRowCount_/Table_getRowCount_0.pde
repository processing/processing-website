Table table;

void setup() {

  table = new Table();
  
  table.addColumn("name");
  table.addColumn("type");
  
  println(table.getRowCount());  // Prints 0
  
  TableRow newRow = table.addRow();
  newRow.setString("name", "Lion");
  newRow.setString("type", "Mammal");
  println(table.getRowCount());  // Prints 1
  
  table.addRow();  // Creates a new blank row
  println(table.getRowCount());  // Prints 2
}
