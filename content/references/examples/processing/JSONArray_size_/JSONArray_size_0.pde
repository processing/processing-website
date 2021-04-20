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

  println("JSONArray size is " + values.size());
}

// Sketch prints:
// JSONArray size is 3
