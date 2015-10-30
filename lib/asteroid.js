(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    //options is passed in as a hash
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = './images/asteroid.png';

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      //if asteroid collides with ship, the ship is relocated. it is not spliced.
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function(ctx) {
    ctx.save();
    ctx.drawImage(Asteroid.IMAGE, this.pos[0], this.pos[1],
                      Asteroid.RADIUS * 2, Asteroid.RADIUS * 2);
    ctx.restore();
  };

})();
