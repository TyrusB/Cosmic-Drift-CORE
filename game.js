(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Game = Asteroids.Game = function (canvas) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = null;
    this.canvas = canvas;
    this.DIM_X = this.canvas.width;
    this.DIM_Y = this.canvas.height;
  }

  Game.SPEED = 5;
  Game.ASTEROIDS = 10;


  Game.prototype.addAsteroids = function (numAsteroids) {
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push( Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y) );
    }
  }

  Game.prototype.addShips = function() {
    this.ship = new Asteroids.Ship(this.DIM_X / 2, this.DIM_Y / 2);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach( function (el) {
      el.draw(ctx);
    });

    this.bullets.forEach( function (el) {
      el.draw(ctx);
    });

    this.ship.draw(ctx);
  }

  Game.prototype.move = function () {
    this.asteroids.forEach( function(el) {
      el.move();
    });

    this.bullets.forEach( function(el) {
      el.move();
    })

    this.ship.move();
  }

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet(this));
  }

  Game.prototype.removeAsteroid = function(asteroid){
    var asteroid_index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroid_index, 1);
  }

  Game.prototype.removeBullet = function(bullet){
    var bullet_index = this.bullets.indexOf(bullet);
    this.bullets.splice(bullet_index, 1);
  }

  Game.prototype.step = function(ctx){
    this.move.call(this);
    this.checkBoundaries.call(this);
    this.draw.call(this, ctx);
    this.checkCollisions();
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    var crashed = this.asteroids.some( function (el) {
      return el.isCollidedWith(that.ship);
    });

    if(crashed){
      alert("Game over!");
      that.stop();
    }
  }

  Game.prototype.checkBoundaries = function() {
    var that = this;
    this.asteroids = this.asteroids.filter(function(el) {
      return !(el.posx >= that.DIM_X || el.posy >= that.DIM_Y || el.posx < 0 || el.posy < 0)
    });
  }

  Game.prototype.bindKeyHandlers = function(){
    var that = this;

    key("left", function () {
      that.ship.rotation += Math.PI*(0.1);
    });

    key("right", function () {
      that.ship.rotation -= Math.PI*(0.1);
    });

    key("up", function () {
      var vector = that.ship.getVector()
      that.ship.vx = that.ship.vx + vector[0]
      that.ship.vy = that.ship.vy + vector[1]
    });

    key("space", that.fireBullet.bind(that));

    key("q", function() {that.stop();});
  }

  Game.prototype.stop = function(){
    clearInterval(this.handle);
  }

  Game.prototype.start = function() {
    this.addAsteroids(Game.ASTEROIDS);
    this.addShips();
    this.bindKeyHandlers();
    var context = this.canvas.getContext('2d');
    this.handle = setInterval( this.step.bind(this, context), Game.SPEED );
  }


})(this);

