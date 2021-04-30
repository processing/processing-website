// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.

/*  
  {
    "id": 0,
    "species": "Panthera leo",
   "name": "Lion"
  }
*/

JSONObject json;

void setup() {

  json = loadJSONObject("data.json");

  int id = json.getInt("id");
  String species = json.getString("species");
  String name = json.getString("name");

  println(id + ", " + species + ", " + name);
}

// Sketch prints:
// 0, Panthera leo, Lion
