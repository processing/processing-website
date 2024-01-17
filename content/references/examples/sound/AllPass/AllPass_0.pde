// Create two triangle waves with deconstructive frequencies.
triA = new TriOsc(this);
triA.freq(220);
triB = new TriOsc(this);
triB.freq(410);

// Make an Allpass
allPass = new AllPass(this);
// Give Allpass a high gain to process yucky transience. 
allPass.gain(0.995);

// Start both triangle waves together. 
// This will create a lot of unbridled bright sounds. 
triA.play();
triB.play();
// Processing the sound through this high gained Allpass will warm it up! 
allPass.process(triA);
allPass.process(triB);
