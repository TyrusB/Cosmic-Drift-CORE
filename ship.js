(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {} )

  var Ship = Asteroids.Ship = function(board_x, board_y) {
    Asteroids.MovingObject.call(this, (board_x / 2), (board_y / 2), 0, 0, Ship.RADIUS, Ship.COLOR);
    this.rotation =  Math.PI / 3;
    this.board_x = board_x;
    this.board_y = board_y;
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 7;
  Ship.COLOR = "red";

  Ship.prototype.getVector = function() {
    var x = this.radius * Math.sin(this.rotation);
    var y = this.radius * Math.cos(this.rotation);
    // var mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

    // return [(x / mag), (y / mag)];
    return [(x/10), (y/10)];
  }

  Ship.prototype.draw = function(ctx) {
    var p1x = this.radius * Math.sin(this.rotation);
    var p1y = this.radius * Math.cos(this.rotation);

    var p2x = this.radius * Math.sin(this.rotation + 120 * (Math.PI / 180) );
    var p2y = this.radius * Math.cos(this.rotation + 120 * (Math.PI / 180) );

    var p3x = this.radius * Math.sin(this.rotation + 240 * (Math.PI / 180) );
    var p3y = this.radius * Math.cos(this.rotation + 240 * (Math.PI / 180) );

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.posx + p1x, this.posy + p1y);
    ctx.lineTo(this.posx + p2x, this.posy + p2y);
    ctx.lineTo(this.posx + p3x, this.posy + p3y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posx + p1x,
      this.posy + p1y,
      this.radius / 4,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();


  }

  Ship.prototype.fireBullet = function(game){
    var direction = this.getVector();
    return new Asteroids.Bullet(this.posx, this.posy, direction, game);
  }

  Ship.prototype.power = function(impulse) {
    this.vx += impulse[0]/ 2;
    this.vy += impulse[1]/ 2;
  }

  Ship.prototype.move = function() {
    if (this.posx > this.board_x) {
      this.posx = this.posx - this.board_x + this.vx
    } else if (this.posx < 0){
      this.posx = this.posx + this.board_x + this.vx
    } else {
      this.posx = this.posx + this.vx
    }

    if (this.posy > this.board_y) {
      this.posy = this.posy - this.board_y + this.vy
    } else if (this.posy < 0){
      this.posy = this.posy + this.board_y + this.vy
    } else {
      this.posy = this.posy + this.vy
    }

  }

})(this);