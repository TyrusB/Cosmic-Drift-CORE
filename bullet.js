(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Bullet = Asteroids.Bullet = function(posx, posy, direction, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, posx, posy, direction[0]*10, direction[1]*10, Bullet.RADIUS, Bullet.COLOR )
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 2.5;
  Bullet.COLOR = "yellow";

  Bullet.prototype.hitAsteroids = function() {
      var that = this;
      this.game.asteroids.forEach( function(el) {
        if (el.isCollidedWith(that)) {
          that.game.removeAsteroid(el);
          that.game.removeBullet(that);
        }
    });
  }

  Bullet.prototype.move = function() {
    this.posx = this.posx + this.vx;
    this.posy = this.posy + this.vy;
    this.hitAsteroids(); 
  }

})(this);

