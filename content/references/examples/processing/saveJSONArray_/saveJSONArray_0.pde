String[] species = { "Capra hircus", "Panthera pardus", "Equus zebra" };
String[] names = { "Goat", "Leopard", "Zebra" };

JSONArray values;

void setup() {

  values = new JSONArray();

  for (int i = 0; i < species.length; i++) {

    JSONObject animal = new JSONObject();

    animal.setInt("id", i);
    animal.setString("species", species[i]);
    animal.setString("name", names[i]);

    values.setJSONObject(i, animal);
  }

  saveJSONArray(values, "data/new.json");
}

// Sketch saves the following to a file called "new.json":
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
