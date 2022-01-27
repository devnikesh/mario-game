/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d"); // What type of context do we want, for now we creating a 2d game

canvas.width = innerWidth;
canvas.height = innerHeight; //  Gravity

var gravity = 0.5;
var speed = 10; // Player

var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);

    this.position = {
      x: 100,
      y: 100
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = 40;
    this.height = 40;
  } // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed


  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      c.fillStyle = "red";
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
      if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity;else this.velocity.y = 0;
      if (this.position.x + this.width + this.velocity.x <= canvas.width) this.velocity.x = 0;else this.velocity.x += speed;
    }
  }]);

  return Player;
}();

var Platform = /*#__PURE__*/function () {
  function Platform(_ref) {
    var x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Platform);

    this.position = {
      x: x,
      y: y
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = 200;
    this.height = 20;
  } // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed


  _createClass(Platform, [{
    key: "draw",
    value: function draw() {
      c.fillStyle = "blue";
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Platform;
}();

var player = new Player();
var platforms = [new Platform({
  x: 200,
  y: 100
}), new Platform({
  x: 500,
  y: 100
})];
var keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
};
var scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach(function (platform) {
    platform.draw();
  });

  if (keys.right.pressed) {
    scrollOffset += 5;
    platforms.forEach(function (platform) {
      platform.position.x -= 5;
    });

    if (player.position.x < 400) {
      player.velocity.x = 5;
    }
  } else if (keys.left.pressed) {
    scrollOffset -= 5;
    platforms.forEach(function (platform) {
      platform.position.x += 5;
    });

    if (player.position.x > 100) {
      player.velocity.x -= 5;
    }
  } else {
    player.velocity.x = 0;
  }

  console.log(scrollOffset); // if (keys.right.pressed && player.position.x < 400) {
  //   player.velocity.x = 5;
  // } else if (keys.left.pressed && player.position.x > 100) {
  //   player.velocity.x -= 5;
  // } else {
  //   player.velocity.x = 0;
  //   if (keys.right.pressed) {
  //     platform.position.x -= 5;
  //   } else if (keys.left.pressed) {
  //     platform.position.x += 5;
  //   }
  // }
  // console.log("animating...");
  // Collision Detection

  platforms.forEach(function (platform) {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0;
    }
  });

  if (scrollOffset > 2000) {
    console.log("You Win!");
  }
}

animate();
addEventListener("keydown", function (_ref2) {
  var keyCode = _ref2.keyCode;

  switch (keyCode) {
    case 65:
    case 37:
      console.log("Left");
      keys.left.pressed = true;
      break;

    case 87:
    case 38:
      console.log("Up");
      player.velocity.y -= 20;
      break;

    case 83:
    case 40:
      console.log("Down");
      keys.down.pressed = true;
      break;

    case 68:
    case 39:
      console.log("Right");
      keys.right.pressed = true;
      break;
  }
});
addEventListener("keyup", function (_ref3) {
  var keyCode = _ref3.keyCode;

  switch (keyCode) {
    case 65:
    case 37:
      console.log("Left");
      keys.left.pressed = false;
      console.log(keys.left.pressed);
      break;

    case 87:
    case 38:
      console.log("Up");
      break;

    case 83:
    case 40:
      console.log("Down");
      break;

    case 68:
    case 39:
      console.log("Right");
      keys.right.pressed = false;
      console.log(keys.right.pressed);
      break;
  }
});
/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map