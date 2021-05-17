// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// {
//   "goat": {
//     "id": 0,
//     "species": "Capra hircus"
//   },
//   "leopard": {
//     "id": 1,
//     "species": "Panthera pardus"
//   },
//   "zebra": {
//     "id": 2,
//     "species": "Equus zebra"
//   }
// }

JSONObject json;

void setup() {

  json = loadJSONObject("data.json");

  JSONObject goat = json.getJSONObject("goat");

  int id = goat.getInt("id");
  String species = goat.getString("species");

  println(id + ", " + species);
}

// Sketch prints:
// 0, Capra hircus
