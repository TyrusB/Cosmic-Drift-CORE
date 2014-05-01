(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Asteroid = Asteroids.Asteroid = function() {
    Asteroids.MovingObject.apply(this, arguments);
    this.rotation = Math.random() * 360; 
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "grey"

  Asteroid.RADIUS = 15;

  Asteroid.MIN_RADIUS = 10;
  Asteroid.MAX_RADIUS = 25;

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

    var p1x = this.radius * Math.sin(this.rotation + 30 * (Math.PI / 180) );
    var p1y = this.radius * Math.cos(this.rotation + 30 * (Math.PI / 180) );

    var p2x = 1 / 2 * this.radius * Math.sin(this.rotation + 60 * (Math.PI / 180) );
    var p2y = 1 / 2 * this.radius * Math.cos(this.rotation + 60 * (Math.PI / 180) );

    var p3x = this.radius * Math.sin(this.rotation + 105 * (Math.PI / 180) );
    var p3y = this.radius * Math.cos(this.rotation + 105 * (Math.PI / 180) );

    var p4x = this.radius * Math.sin(this.rotation + 165 * (Math.PI / 180));
    var p4y = this.radius * Math.cos(this.rotation + 165 * (Math.PI / 180));

    var p5x = 2 / 3 * this.radius * Math.sin(this.rotation + 180 * (Math.PI / 180) );
    var p5y = 2 / 3 * this.radius * Math.cos(this.rotation + 180 * (Math.PI / 180) );

    var p6x = this.radius * Math.sin(this.rotation + 220 * (Math.PI / 180) );
    var p6y = this.radius * Math.cos(this.rotation + 220 * (Math.PI / 180) );

    var p7x = this.radius * Math.sin(this.rotation + 270 * (Math.PI / 180) );
    var p7y = this.radius * Math.cos(this.rotation + 270 * (Math.PI / 180) );

    var p8x = this.radius * Math.sin(this.rotation + 330 * (Math.PI / 180) );
    var p8y = this.radius * Math.cos(this.rotation + 330 * (Math.PI / 180) );

    var x = this.posx,
        y = this.posy;

    ctx.beginPath()
    ctx.moveTo(x + p1x, y + p1y);
    ctx.lineTo(x + p2x, y + p2y);
    ctx.lineTo(x + p3x, y + p3y);
    ctx.lineTo(x + p4x, y + p4y);
    ctx.lineTo(x + p5x, y + p5y);
    ctx.lineTo(x + p6x, y + p6y);
    ctx.lineTo(x + p7x, y + p7y);
    ctx.lineTo(x + p8x, y + p8y);
    ctx.closePath();
    ctx.fill();
  }




})(this);

