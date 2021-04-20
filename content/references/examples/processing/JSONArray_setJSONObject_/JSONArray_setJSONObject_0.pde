JSONArray json;

void setup() {

  json = new JSONArray();

  JSONObject lion = new JSONObject();
  lion.setInt("id", 0);
  lion.setString("species", "Panthera leo");
  
  json.setJSONObject(0, lion);

  JSONObject zebra = new JSONObject();
  zebra.setInt("id", 1);
  zebra.setString("species", "Equus zebra");
  
  json.setJSONObject(1, zebra);

  println(json);
}

// Sketch prints:
// [
//   {
//     "id": 0,
//     "species": "Panthera leo"
//   },
//   {
//     "id": 1,
//     "species": "Equus zebra"
//   }
// ]
