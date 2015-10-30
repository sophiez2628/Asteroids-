(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.dir = options.dir;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.lives = options.lives;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  MovingObject.prototype.draw = function (ctx) {

      ctx.fillStyle = this.color;
      ctx.beginPath();
      //how does context draw arc?
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );
      ctx.fill();

    //if the object is a ship, draw a triangle


  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var thisObjectCenter;
    var otherObjectCenter;

    if (this instanceof Asteroids.Asteroid || this instanceof Asteroids.Ship) {
      thisObjectCenter = [this.pos[0] + this.radius, this.pos[1] + this.radius];
    } else {
      thisObjectCenter =  this.pos;
    }

    if (otherObject instanceof Asteroids.Asteroid || otherObject instanceof Asteroids.Ship) {
      otherObjectCenter = [otherObject.pos[0] + otherObject.radius, otherObject.pos[1] + otherObject.radius];
    } else {
      otherObjectCenter = otherObject.pos;
    }

    var centerDist = Asteroids.Util.dist(thisObjectCenter, otherObjectCenter);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    console.log(this);
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    console.log(this.pos);
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
