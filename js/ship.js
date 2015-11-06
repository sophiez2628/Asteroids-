(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.initialPos = options.initialPos;
    options.vel = options.vel || [0, 0];
    options.dir = options.dir || -90;
    options.color = options.color || randomColor();
    options.lives = options.lives || 3;

    Asteroids.MovingObject.call(this, options);
  };

  // Ship.RADIUS = 30;
  // Ship.WIDTH = Ship.RADIUS / 1.8;
  // Ship.HEIGHT = Ship.RADIUS;
  // Ship.COLOR = "#FF0000";
  // Ship.ACCELERATOR = 0.8;
  // Ship.DEACCELERATOR = 0.1;

  Ship.RADIUS = 30;
  Ship.IMAGE = new Image();
  Ship.IMAGE.src = "images/rocket.png";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    if (this.initialPos[0] !== this.pos[0] && this.initialPos[1] !== this.pos[1]) {
      var dirVector = Asteroids.Util.getVectors(this.dir);
      var velMultiplier = 60;
      var velX = dirVector[0] * velMultiplier;
      var velY = dirVector[1] * velMultiplier;

      var bullet = new Asteroids.Bullet({
        //same as the ship's position
        pos: this.pos,
        vel: [velX, velY],
        color: this.color,
        game: this.game
      });

      this.game.add(bullet);
    }
  };

  Ship.prototype.power = function (impulse) {
    if (!this.powerInterval) {
      // Ship.IMAGE.src = "./images/rocket.png";
      this.powerInterval = setInterval(this.increasePower.bind(this), 20);
    }
  };

  Ship.prototype.increasePower = function () {
    var powerMagnitude = 0.13;
    var vector = Asteroids.Util.getVectors(this.dir);
    this.vel[0] += vector[0] * powerMagnitude;
    this.vel[1] += vector[1] * powerMagnitude;
  };


  Ship.prototype.rotate = function(val) {
    if (!this.rotationInterval) {
      this.rotationInterval = setInterval(function () {
        var rotationMagnitude = 7;
        this.dir += (val * rotationMagnitude);
      }.bind(this), 20);
    }
  };

  Ship.prototype.powerStop = function() {
    // Ship.IMAGE.src = "./images/rocket_with_flame.png";
    clearInterval(this.powerInterval);
    this.powerInterval = null;
  };

  Ship.prototype.relocate = function () {
    // Ship.IMAGE.src = "./images/rocket.png";
    if (this.initialPos[0] !== this.pos[0] && this.initialPos[1] !== this.pos[1]) {
      console.log(this.initialPos);
      console.log(this.pos);
      if (this.lives > 0 ) {
        this.lives -= 1;
      }
      var pos = this.game.randomPosition();
      this.pos = pos;
      this.initialPos = pos;
      this.vel = [0,0];
    }
  };

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate((this.dir + 90) * (Math.PI/180));
    ctx.drawImage(Ship.IMAGE, -Ship.RADIUS, -Ship.RADIUS,
                      Ship.RADIUS * 2, Ship.RADIUS * 2);
    ctx.restore();
  };

  Ship.prototype.rotateStop = function (val) {
    clearInterval(this.rotationInterval);
    this.rotationInterval = null;
 };

 Ship.prototype.stopShip = function() {
    this.vel = [0, 0];
 };

})();
