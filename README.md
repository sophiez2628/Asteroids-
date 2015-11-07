# Asteroids
[Click here to play!](http://sophiez2628.github.io/Asteroids-/)

![screenshot](./asteroids_image.png)

An one-player browser game built using JavaScript and HTML5 Canvas.

### Code Highlights
* Moving objects (ship, bullets, asteroids) inherit from the Moving Object class.
<pre><code>
var inherits = Util.inherits = function (ChildClass, BaseClass) {
  function Surrogate () { this.constructor = ChildClass };
  Surrogate.prototype = BaseClass.prototype;
  ChildClass.prototype = new Surrogate();
};
... 
Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
</pre></code>
* The collision detection algorithm is based on the distance between the centers of the objects.

<pre><code>
Game.prototype.checkCollisions = function () {
  var game = this;

  this.allObjects().forEach(function (obj1) {
    game.allObjects().forEach(function (obj2) {
      if (obj1 == obj2) {
        return;
      }

      if (obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
      }
    });
  });
};
</pre></code>
