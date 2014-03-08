(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "grey"

  Asteroid.RADIUS = 15;

  Asteroid.MAX_VEL = 2.0;
  Asteroid.MIN_VEL = 1.0;

  // Asteroid.prototype.randomVel = function() {
  //   var vx = Math.random() * (Asteroid.MAX_VEL - Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1) + Asteroid.MIN_VEL;
  //   var vy = Math.random() * (Asteroid.MAX_VEL - Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1) + Asteroid.MIN_VEL;

  //   return [vx, vy];
  // }

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var posx = Math.random() * dimX;
    var posy = Math.random() * dimY;
    var vx = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);
    var vy = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);

    return new Asteroid(posx, posy, vx, vy, Asteroid.RADIUS, Asteroid.COLOR);
  }

  Asteroid.edgeAsteroid = function(dimX, dimY) {
    var randomSign = (Math.random() > 0.5 ? 1 : -1 )

    var posx = Math.random() * 10 * randomSign;
    var posy = Math.random() * 10 * randomSign;
    var vx = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);
    var vy = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);

    return new Asteroid(posx, posy, vx, vy, Asteroid.RADIUS, Asteroid.COLOR);
  }


})(this);

