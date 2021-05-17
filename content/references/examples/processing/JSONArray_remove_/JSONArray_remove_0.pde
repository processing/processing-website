// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// [
//   {
//     "id": 0,
//     "species": "Capra hircus",
//     "name": "Goat"
//   },
//   {
//     "id": 1,
//     "species": "Panthera pardus",
//     "name": "Leopard"
//   },
//   {
//     "id": 2,
//     "species": "Equus zebra",
//     "name": "Zebra"
//   }
// ]

JSONArray values;

void setup() {

  values = loadJSONArray("data.json");

  values.remove(0);  // Remove the array's first element

  for (int i = 0; i < values.size(); i++) {
    
    JSONObject animal = values.getJSONObject(i); 

    int id = animal.getInt("id");
    String species = animal.getString("species");
    String name = animal.getString("name");

    println(id + ", " + species + ", " + name);
  }
}

// Sketch prints:
// 1, Panthera pardus, Leopard
// 2, Equus zebra, Zebra
