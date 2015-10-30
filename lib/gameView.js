(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "up": 1
  };

  GameView.ROTATE = {
    "right": 1,
    "left": -1
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    $(window).on('keyup', this.handleKeyUp.bind(this));
    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    Object.keys(GameView.ROTATE).forEach(function (k) {
      var move = GameView.ROTATE[k];
      key(k, function() { ship.rotate(move); });
    });

    key("space", function () { ship.fireBullet(); });
    key("q", function() { this.stopGame(); }.bind(this) );
    key("down", function() { ship.stopShip(); }.bind(this) );
  };

  GameView.prototype.handleKeyUp = function(event) {
    var ship = this.ship;

    switch(event.keyCode) {
      case 37:
        ship.rotateStop();
        break;
      case 38:
        ship.powerStop();
        break;
      case 39:
        ship.rotateStop();
        break;
    }
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        //moves objects and checks for collisions in the method called step
        gameView.game.step();
        //then redraws the object
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stopGame = function () {
    clearInterval(this.timerId);
    this.displayGameOverScreen();
  };

  GameView.prototype.displayGameOverScreen = function() {
    this.ctx.clearRect(0, 0, 1200, 600);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1200, 600);
    this.ctx.textAlign = "center";
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 600, 300);
  };
})();
