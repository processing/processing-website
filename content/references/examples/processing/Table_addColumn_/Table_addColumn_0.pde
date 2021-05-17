Table table;

void setup() {

  table = new Table();
  
  table.addColumn("name");
  table.addColumn("age", Table.INT);
  table.addColumn("height", Table.FLOAT);
  
  TableRow newRow = table.addRow();
  newRow.setString("name", "Jermaine");
  newRow.setInt("age", 15);
  newRow.setFloat("height", 4.567);
  
  saveTable(table, "data/new.csv");
}

// Sketch saves the following to a file called "new.csv":
// name,age,height
// Jermaine,15,4.567
