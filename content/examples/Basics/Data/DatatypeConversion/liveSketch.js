/**
 * Datatype Conversion.
 *
 * It is sometimes beneficial to convert a value from one type of
 * data to another. Each of the conversion functions converts its parameter
 * to an equivalent representation within its datatype.
 * The conversion functions include int(), float(), char(), byte(), and others.
 */

// The next line is needed if running in JavaScript Mode with Processing.js
/* @pjs font="Georgia.ttf"; */

function runLiveSketch(s) {
  s.setup = () => {
    s.createCanvas(640, 360);
    s.background(0);
    s.noStroke();

    s.textFont('Source Code Pro', 24);

    var c; // Chars are used for storing alphanumeric symbols
    var f; // Floats are decimal numbers
    var i; // Integers are values between 2,147,483,647 and -2147483648
    var b; // Bytes are values between -128 and 128

    c = 'A';
    f = c.charCodeAt(0); // Sets f = 65.0
    i = s.floor(f * 1.4); // Sets i to 91
    b = s.floor(c.charCodeAt(0) / 2); // Sets b to 32

    //println(f);
    //println(i);
    //println(b);

    s.noStroke();
    s.fill(255);
    s.text('The value of variable c is ' + c, 50, 100);
    s.text('The value of variable f is ' + f, 50, 150);
    s.text('The value of variable i is ' + i, 50, 200);
    s.text('The value of variable b is ' + b, 50, 250);
    s.noLoop();
  };
}
