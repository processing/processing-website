/**
 * Request Image
 * by Ira Greenberg ( From Processing for Flash Developers).
 *
 * Shows how to use the requestImage() function with preloader animation.
 * The requestImage() function loads images on a separate thread so that
 * the sketch does not freeze while they load. It's very useful when you are
 * loading large images.
 *
 * These images are small for a quick download, but try it with your own huge
 * images to get the full effect.
 */
function runLiveSketch(s) {
  var imgCount = 12;
  var imgs = new Array(imgCount);
  var imgW;

  // Keeps track of loaded images (true or false)
  var loadStates = new Array(imgCount);

  // For loading animation
  var loaderX, loaderY, theta;

  s.setup = () => {
    s.createCanvas(640, 360);
    imgW = s.width / imgCount;

    // Load images asynchronously
    for (var i = 0; i < imgCount; i++) {
      imageLoader(
        '/livesketch-manual/sequence/PT_anim' + s.nf(i, 4) + '.png',
        i
      );
    }
  };

  function imageLoader(path, num) {
    s.loadImage(path, function (img) {
      imgs[num] = img;
      loadStates[num] = true;
    });
  }

  s.draw = () => {
    s.background(0);

    // Start loading animation
    runLoaderAni();

    // When all images are loaded draw them to the screen
    if (checkLoadStates()) {
      drawImages();
    }
  };

  function drawImages() {
    var y = (s.height - imgs[0].height) / 2;
    for (var i = 0; i < imgs.length; i++) {
      s.image(
        imgs[i],
        (s.width / imgs.length) * i,
        y,
        imgs[i].height,
        imgs[i].height
      );
    }
  }

  // Loading animation
  function runLoaderAni() {
    // Only run when images are loading
    if (!checkLoadStates()) {
      s.ellipse(loaderX, loaderY, 10, 10);
      loaderX += 2;
      loaderY = s.height / 2 + s.sin(theta) * (s.height / 8);
      theta += s.PI / 22;
      // Reposition ellipse if it goes off the screen
      if (loaderX > s.width + 5) {
        loaderX = -5;
      }
    }
  }

  // Return true when all images are loaded - no false values left in array
  function checkLoadStates() {
    for (var i = 0; i < imgs.length; i++) {
      if (!loadStates[i]) {
        return false;
      }
    }
    return true;
  }
}
