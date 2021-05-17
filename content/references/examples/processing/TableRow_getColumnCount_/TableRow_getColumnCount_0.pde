Table table;

void setup() {

  table = new Table();
  
  table.addColumn("number", Table.INT);
  table.addColumn("mass", Table.FLOAT);
  table.addColumn("name", Table.STRING);
  
  TableRow row = table.addRow();
  
  println(row.getColumnCount());  // Prints "3"
}
