JSONObject json;

void setup() {

  json = new JSONObject();
  json.setInt("id", 0);
  json.setString("species", null);

  if (json.isNull("species") == true) {
    println("The species is undefined");
  } else {
    println("The ID is " + json.getString("species"));
  }
}
