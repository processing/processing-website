Table table;

void setup() {

  table = new Table();
  
  println(table.getColumnCount());  // Prints 0
  
  table.addColumn("name");
  println(table.getColumnCount());  // Prints 1
  
  table.addColumn("type");
  println(table.getColumnCount());  // Prints 2
}
