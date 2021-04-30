// The following short JSON file called "data.json" is parsed 
// in the code below. It must be in the project's "data" folder.
//
// [ "sasquatch", "yeti", "jackalope", "unicorn", "centaur" ]

JSONArray json;

void setup() {

  json = loadJSONArray("data.json");

  String[] values = json.getStringArray();

  println(values);
}

// Sketch prints:
// [0] "sasquatch"
// [1] "yeti"
// [2] "jackalope"
// [3] "unicorn"
// [4] "centaur"
