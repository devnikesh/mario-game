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

const player = new Player();
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

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x -= 5;
  } else player.velocity.x = 0;
  // console.log("animating...");
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
      keys.up.pressed = true;
      player.velocity.y -= 10;
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
