(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "grey"

  Asteroid.RADIUS = 15;

  Asteroid.MAX_VEL = 1.5;

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var posx = Math.random() * dimX;
    var posy = Math.random() * dimY;
    var vx = Math.random() * Asteroid.MAX_VEL * (Math.random() < 0.5 ? -1 : 1);
    var vy = Math.random() * Asteroid.MAX_VEL * (Math.random() < 0.5 ? -1 : 1);

    return new Asteroid(posx, posy, vx, vy, Asteroid.RADIUS, Asteroid.COLOR);
  }



})(this);

