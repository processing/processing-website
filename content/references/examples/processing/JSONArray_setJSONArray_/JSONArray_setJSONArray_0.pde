JSONArray json;

void setup() {

  json = new JSONArray();

  for (int i = 0; i < 3; i++) {

    JSONArray values = new JSONArray();

    values.setInt(0, i);
    values.setInt(1, i);
    values.setInt(2, i);

    json.setJSONArray(i, values);
  }  

  println(json);
}

// Sketch prints:
//[
//  [
//    0,
//    0,
//    0
//  ],
//  [
//    1,
//    1,
//    1
//  ],
//  [
//    2,
//    2,
//    2
//  ]
//]
