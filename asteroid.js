(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "grey"

  Asteroid.RADIUS = 15;

  Asteroid.MIN_RADIUS = 8;
  Asteroid.MAX_RADIUS = 23;

  Asteroid.MAX_VEL = 3.5;
  Asteroid.MIN_VEL = 1.0;

  Asteroid.randomBetween = function(min, max) {
    return ( Math.random() * (max - min) + min );
  }

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var posx = Math.random() * dimX;
    var posy = Math.random() * dimY;
    var vx = Asteroid.randomBetween(Asteroid.MIN_VEL, Asteroid.MAX_VEL) * (Math.random() < 0.5 ? -1 : 1);
    var vy = Asteroid.randomBetween(Asteroid.MIN_VEL, Asteroid.MAX_VEL) * (Math.random() < 0.5 ? -1 : 1);

    var radius = Asteroid.randomBetween(Asteroid.MIN_RADIUS, Asteroid.MAX_RADIUS);

    return new Asteroid(posx, posy, vx, vy, radius, Asteroid.COLOR);
  }

  Asteroid.edgeAsteroid = function(dimX, dimY) {
    var randomSign = (Math.random() > 0.5 ? 1 : -1 )

    var posx = Math.random() * 10 * randomSign;
    var posy = Math.random() * 10 * randomSign;
    var vx = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);
    var vy = ((Asteroid.MAX_VEL - Asteroid.MIN_VEL) * Math.random() + Asteroid.MIN_VEL) * (Math.random() < 0.5 ? -1 : 1);

    return new Asteroid(posx, posy, vx, vy, Asteroid.RADIUS, Asteroid.COLOR);
  }

  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    var x = this.posx,
        y = this.posy,
        r = this.radius * 2;

    ctx.beginPath()
    ctx.moveTo(x + r / 4, y + r / 2);
    ctx.lineTo(x + r / 3, y + r / 3);
    ctx.lineTo(x + r / 2, y - r / 5);
    ctx.lineTo(x + r / 4, y - r / 2);
    ctx.lineTo(x, y - 3 * r / 8);
    ctx.lineTo(x - 3 * r / 8, y - r / 2);
    ctx.lineTo(x - 3 * r / 8, y - r / 3);
    ctx.lineTo(x - r / 2, y);
    ctx.lineTo(x - r / 3, y + r / 2);
    ctx.closePath();
    ctx.fill();
  }




})(this);

