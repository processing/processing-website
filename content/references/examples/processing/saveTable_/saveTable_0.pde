Table table;

void setup() {

  table = new Table();
  
  table.addColumn("id");
  table.addColumn("species");
  table.addColumn("name");
  
  TableRow newRow = table.addRow();
  newRow.setInt("id", table.getRowCount() - 1);
  newRow.setString("species", "Panthera leo");
  newRow.setString("name", "Lion");
  
  saveTable(table, "data/new.csv");
}

// Sketch saves the following to a file called "new.csv":
// id,species,name
// 0,Panthera leo,Lion
