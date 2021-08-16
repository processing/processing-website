// These are code fragments that show how to use an ArrayList.
// They won't compile because they assume the existence of a Particle class.

// Declaring the ArrayList, note the use of the syntax "<Particle>" to indicate
// our intention to fill this ArrayList with Particle objects
ArrayList<Particle> particles = new ArrayList<Particle>();

// Objects can be added to an ArrayList with add()
particles.add(new Particle());

// Particles can be pulled out of an ArrayList with get()
Particle part = particles.get(0);
part.display();

// The size() method returns the current number of items in the list
int total = particles.size();
println("The total number of particles is: " + total);

// You can iterate over an ArrayList in two ways.
// The first is by counting through the elements:
for (int i = 0; i < particles.size(); i++) {
  Particle part = particles.get(i);
  part.display();
}

// The second is using an enhanced loop:
for (Particle part : particles) {
  part.display();
}

// You can delete particles from an ArrayList with remove()
particles.remove(0);
println(particles.size()); // Now one less!

// If you are modifying an ArrayList during the loop,
// then you cannot use the enhanced loop syntax.
// In addition, when deleting in order to hit all elements, 
// you should loop through it backwards, as shown here:
for (int i = particles.size() - 1; i >= 0; i--) {
  Particle part = particles.get(i);
  if (part.finished()) {
    particles.remove(i);
  }
}
