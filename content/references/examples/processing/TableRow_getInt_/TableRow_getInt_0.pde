Table table;

void setup() {

  table = new Table();
  
  table.addColumn("number", Table.INT);
  table.addColumn("mass", Table.FLOAT);
  table.addColumn("name", Table.STRING);
  
  TableRow row = table.addRow();
  row.setInt("number", 8);
  row.setFloat("mass", 15.9994);
  row.setString("name", "Oxygen");
  
  println(row.getInt("number"));   // Prints 8
  println(row.getFloat("mass"));   // Prints 15.9994
  println(row.getString("name"));  // Prints "Oxygen
}
