Table table;

void setup() {

  table = new Table();
  
  table.addColumn("number", Table.INT);
  table.addColumn("mass", Table.FLOAT);
  table.addColumn("name", Table.STRING);
  
  TableRow row = table.addRow();
  
  println(row.getColumnTitle(0));  // Prints "number"
  println(row.getColumnTitle(1));  // Prints "mass"
  println(row.getColumnTitle(2));  // Prints "name"
}
