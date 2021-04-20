Table table;

void setup() {

  table = new Table();
  
  table.addColumn("id");
  table.addColumn("species");
  table.addColumn("name");
  println(table.getColumnCount());  //Prints 3
  
  table.removeColumn(0);            //Reference by ID
  println(table.getColumnCount());  //Prints 2
}
