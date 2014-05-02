(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Game = Asteroids.Game = function (canvas) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = null;
    this.canvas = canvas;
    this.turnNo = 1;
    this.score = 0;

    Game.DIM_X = this.canvas.width;
    Game.DIM_Y = this.canvas.height;
  }

  Game.SPEED = 20;
  Game.ASTEROIDS = 10;
  Game.THRUST_POWER = 0.35;
  Game.HANDLE_TWEAK = 1.0;
  Game.MAX_THRUST = 7.0;



  Game.prototype.addAsteroids = function (numAsteroids) {
    while (this.asteroids.length < numAsteroids) {
      var randomAsteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y) 
      if ( Math.abs(randomAsteroid.posx - Game.DIM_X / 2) > 100 && Math.abs(randomAsteroid.posy - Game.DIM_Y / 2) < 80 ) {
        this.asteroids.push( randomAsteroid );
      }
    }
  }

  Game.prototype.replenishAsteroids = function() {
    if (this.turnNo % 20 == 0 && this.asteroids.length < Game.ASTEROIDS) {
        this.asteroids.push( Asteroids.Asteroid.edgeAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }


  Game.prototype.addShips = function() {
    this.ship = new Asteroids.Ship(Game.DIM_X, Game.DIM_Y);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach( function (el) {
      el.draw(ctx);
    });

    this.bullets.forEach( function (el) {
      el.draw(ctx);
    });

    this.ship.draw(ctx);
    this.drawScore(ctx);
  }

  Game.prototype.move = function () {
    this.asteroids.forEach( function(el) {
      el.move();
      el.rotation = (el.rotation += 0.1) % 360;
    });

    this.bullets.forEach( function(el) {
      el.move();
    })

    this.ship.move();
  }

  Game.prototype.drawScore = function(ctx) {
    var scorex = Game.DIM_X - 30;
    var scorey = 30;

    ctx.font = '30pt Calibri';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right'
    ctx.fillText("Score: " + this.score, scorex, scorey);
  }

  Game.prototype.fireBullet = function() {
    if (this.bullet_cooldown < 0 ) {
      this.bullets.push(this.ship.fireBullet(this));
      this.bullet_cooldown = 5;
    }
  }

  Game.prototype.removeAsteroid = function(asteroid){
    this.score += parseInt(asteroid.radius / 4)
    var asteroid_index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroid_index, 1);
  }

  Game.prototype.removeBullet = function(bullet){
    var bullet_index = this.bullets.indexOf(bullet);
    this.bullets.splice(bullet_index, 1);
  }


  Game.prototype.checkCollisions = function() {
    var that = this;
    var crashed = this.asteroids.some( function (el) {
      return el.isCollidedWith(that.ship);
    });

    if(crashed){
      that.stop();
      alert("Game over!");
      location.reload();
    }
  }

  // Game.prototype.checkBoundaries = function() {
  //   var that = this

  //   this.asteroids = this.asteroids.filter(function(el) {
  //     return !(el.posx >= that.DIM_X || el.posy >= that.DIM_Y || el.posx < 0 || el.posy < 0)
  //   });

  //   this.bullets = this.bullets.filter(function(el) {
  //     return !(el.posx >= that.DIM_X || el.posy >= that.DIM_Y || el.posx < 0 || el.posy < 0)
  //   });
  // }

  Game.prototype.listenKeyEvents = function(){
    var that = this;

    if (key.isPressed("left")) {
      that.ship.rotation += Math.PI*(0.05) * Game.HANDLE_TWEAK ;
    };

    if (key.isPressed("right")) {
      that.ship.rotation -= Math.PI*(0.05) * Game.HANDLE_TWEAK;
    };

    if(key.isPressed("space")) {
      that.fireBullet();
    }

    if (key.isPressed("up")) {
      var vector = that.ship.getVector();
      that.ship.thrusting = true;

      that.ship.vx = that.ship.vx + vector[0] * Game.THRUST_POWER;
      if (that.ship.vx > 0) {
        that.ship.vx = Math.min(that.ship.vx, Game.MAX_THRUST);
      } else {
        that.ship.vx = Math.max(that.ship.vx, -1 * Game.MAX_THRUST);
      }

      that.ship.vy = that.ship.vy + vector[1] * Game.THRUST_POWER;
      if (that.ship.vy > 0) {
        that.ship.vy = Math.min(that.ship.vy, Game.MAX_THRUST);
      } else {
        that.ship.vy = Math.max(that.ship.vy, -1 * Game.MAX_THRUST);
      }
    } else {
      that.ship.thrusting = false;
    };
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    //key("space", that.fireBullet.bind(that));
    this.bullet_cooldown = 1;
    key("q", function() {
     that.stop();
    });

  }

  Game.prototype.step = function(ctx){
    this.turnNo += 1
    this.bullet_cooldown -= 1;

    this.replenishAsteroids.call(this);

    this.listenKeyEvents();
    this.move.call(this);
    //this.checkBoundaries.call(this);
    this.draw.call(this, ctx);
    this.checkCollisions();

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

  Game.prototype.loadInstructions = function() {
    var game = this;
    key.setScope('intro');

    var ctx = this.canvas.getContext('2d');
    var center_x = canvas.width / 2,
        center_y = canvas.height / 2;

    ctx.font = '65pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'yellow';
    ctx.fillText('Cosmic Drift', center_x, center_y - 100);
    ctx.font = '30pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText('Instructions:', center_x, center_y)
    ctx.fillText('Arrow Keys Turn', center_x, center_y + 50)
    ctx.fillText('Space Bar Shoots', center_x, center_y + 100)
    ctx.font = '20pt Calibri';
    ctx.fillText('Hit enter to begin. Good luck and happy drifting...', center_x, center_y + 200);

    key('enter', 'intro', function() {
      game.start();
      key.setScope('game');
    }) 
  }


})(this);

