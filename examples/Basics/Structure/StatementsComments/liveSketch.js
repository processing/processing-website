/**
 * Statements and Comments.
 *
 * Statements are the elements that make up programs.
 * The ";" (semi-colon) symbol is used to end statements.
 * It is called the "statement terminator."
 * Comments are used for making notes to help people better understand programs.
 * A comment begins with two forward slashes ("//").
 */

function runLiveSketch(s) {
  s.setup = () => {
    // The size function is a statement that tells the computer
    // how large to make the window.
    // Each function statement has zero or more parameters.
    // Parameters are data passed into the function
    // and are used as values for telling the computer what to do.
    s.createCanvas(640, 360);

    // The background function is a statement that tells the computer
    // which color (or gray value) to make the background of the display window
    s.background(204, 153, 0);
  };
}
