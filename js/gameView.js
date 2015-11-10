(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
    this.bindKeyHandlers();
  };

  GameView.MOVES = {
    "up": 1
  };

  GameView.ROTATE = {
    "right": 1,
    "left": -1
  };

  GameView.prototype.displayInstruc = function() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1200, 600);
    this.ctx.textAlign = "center";
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Asteroids", 600, 100);
    this.ctx.fillText("press enter to play", 600, 150);
    this.ctx.fillText("use arrows to move", 600, 200);
    this.ctx.fillText("space bar to shoot", 600, 250);
    this.ctx.font = "28px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("(note: when game initially begins, asteroids can't destroy ship & ship can only shoot after moving)", 600, 350);
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

    key("space", function (event) { event.preventDefault(); ship.fireBullet(); });
    key("q", function(event) { event.preventDefault(); this.stopGame(); }.bind(this) );
    key("down", function(event) { event.preventDefault(); ship.stopShip(); }.bind(this) );
    key("return", function(event) { event.preventDefault(); this.start(); }.bind(this) );
  };

  GameView.prototype.handleKeyUp = function(event) {
    event.preventDefault();
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
    this.ctx.clearRect(0, 0, 1200, 600);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1200, 600);
    var gameView = this;
    this.timerId = setInterval(
      function () {
        //moves objects and checks for collisions in the method called step
        gameView.game.step();
        //then redraws the object
        gameView.game.draw(gameView.ctx);

        //check for number of lives left
        if (this.ship && this.ship.lives === 0) {
          this.stopGame();
        } else if (this.game.asteroids.length === 0) {
          this.game.levelUp();
          this.displayGameLevel();
          this.game.addAsteroids();
        }
      }.bind(this), 1000 / Asteroids.Game.FPS
    );

  };

  GameView.prototype.stopGame = function () {
    clearInterval(this.timerId);
    this.displayGameOverScreen();
  };

  GameView.prototype.displayGameLevel = function() {
    this.ctx.clearRect(0, 0, 1200, 600);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1200, 600);
    this.ctx.textAlign = "center";
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("LEVEL " + this.game.level, 600, 300);
  };

  GameView.prototype.displayGameOverScreen = function() {
    this.game.removeAllObjects();
    this.ctx.clearRect(0, 0, 1200, 600);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1200, 600);
    this.ctx.textAlign = "center";
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 600, 300);
  };
})();
