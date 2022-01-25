const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // What type of context do we want, for now we creating a 2d game
canvas.width = innerWidth;
canvas.height = innerHeight;

//  Gravity
const gravity = 0.5;
const speed = 10;

// Player

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 40;
    this.height = 40;
  }
  // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
    if (this.position.x + this.width + this.velocity.x <= canvas.width)
      this.velocity.x = 0;
    else this.velocity.x += speed;
  }
}
class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 200;
    this.height = 20;
  }
  // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}

const player = new Player();
const platforms = [
  new Platform({
    x: 200,
    y: 100,
  }),
  new Platform({
    x: 500,
    y: 100,
  }),
];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });

  if (keys.right.pressed) {
    platforms.forEach((platform) => {
      platform.position.x -= 5;
    });
    if (player.position.x < 400) {
      player.velocity.x = 5;
    }
  } else if (keys.left.pressed) {
    platforms.forEach((platform) => {
      platform.position.x += 5;
    });

    if (player.position.x > 100) {
      player.velocity.x -= 5;
    }
  } else {
    player.velocity.x = 0;
  }
  // if (keys.right.pressed && player.position.x < 400) {
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
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

animate();

addEventListener("keydown", ({ keyCode }) => {
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

addEventListener("keyup", ({ keyCode }) => {
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
