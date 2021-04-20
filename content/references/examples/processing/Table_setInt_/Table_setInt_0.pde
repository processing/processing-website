Table table;

void setup() {

  table = new Table();
  
  table.addColumn("number", Table.INT);
  table.addColumn("mass", Table.FLOAT);
  table.addColumn("name", Table.STRING);
  
  table.addRow();  // Creates an empty row
  
  table.setInt(0, "number", 8);
  table.setFloat(0, "mass", 15.9994);
  table.setString(0, "name", "Oxygen");
  
  println(table.getInt(0, "number"));   // Prints 8
  println(table.getFloat(0, "mass"));   // Prints 15.9994
  println(table.getString(0, "name"));  // Prints "Oxygen"
}
