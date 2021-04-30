JSONArray json;

void setup() {

  json = new JSONArray();

  json.setInt(0, 32);
  json.setString(1, null);

  if (json.isNull(1) == true) {
    println("This element is undefined");
  } else {
    println("The value is " + json.getString(1));
  }
}
