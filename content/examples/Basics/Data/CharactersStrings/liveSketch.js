/**
 * Characters Strings.
 *
 * The character datatype, abbreviated as char, stores letters and
 * symbols in the Unicode format, a coding system developed to support
 * a variety of world languages. Characters are distinguished from other
 * symbols by putting them between single quotes ('P').<br />
 * <br />
 * A string is a sequence of characters. A string is noted by surrounding
 * a group of letters with double quotes ("Processing").
 * Chars and strings are most often used with the keyboard methods,
 * to display text to the screen, and to load images or files.<br />
 * <br />
 * The String datatype must be capitalized because it is a complex datatype.
 * A String is actually a class with its own methods, some of which are
 * featured below.
 */

function runLiveSketch(s) {
  var letter = '';
  var words = 'Begin...';
  var lineHeight = 36; 
  var bottomPadding = 5;

  s.setup = () => {
    s.createCanvas(640, 360);
    s.textFont('Source Code Pro', 36);
    s.textWrap(s.CHAR); 
  };

  s.draw = () => {
    s.background(0); // Set background to black

    // Draw the letter and status text
    s.textSize(14);
    s.fill(255);
    s.noStroke();
    s.text('Click on the program, then type to add to the String', 50, 50);
    s.text('Current key: ' + letter, 50, 70);
    s.text('The String is ' + words.length + ' characters long', 50, 90);

    // Calculate the number of lines of text
    s.textSize(36);
    let textWidth = 540; 
    let textHeight = s.textAscent() + s.textDescent();

    // Calculate the number of lines needed for the text
    let numLines = s.ceil(s.textWidth(words) / textWidth);
    let contentHeight = numLines * textHeight + 120 + bottomPadding; 

    // Resize canvas if the content height exceeds the current canvas height
    if (contentHeight > s.height) {
      s.resizeCanvas(640, contentHeight);
    }
    s.text(words, 50, 120, textWidth, s.height);
  };

  s.keyPressed = () => {
    
    if ((s.key >= 'A' && s.key <= 'z') || s.key == ' ') {
      letter = s.key;
      words = words + s.key;
    }
  };
}

