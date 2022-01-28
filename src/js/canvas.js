import platform from "../img/platform.png";
import background from "../img/background.png";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // What type of context do we want, for now we creating a 2d game
canvas.width = 1024;
canvas.height = 576;

//  Gravity
const gravity = 0.5;
const speed = 10;

const platformImage = createImage(platform);
const backgroundImage = createImage(background);

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
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  // Define a method || Draw the Player, Default value is gonna be applied if any value is not passed
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
const genericObjects = [
  new GenericObject({
    x: 0,
    y: 0,
    image: backgroundImage,
  }),
  new GenericObject({
    x: 0,
    y: 0,
    image: backgroundImage,
  }),
];

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const player = new Player();
const platforms = [
  new Platform({
    x: 0,
    y: 470,
    image: platformImage,
  }),
  new Platform({
    x: platformImage.width - 2,
    y: 470,
    image: platformImage,
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

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  genericObjects.forEach((object) => {
    object.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed) {
    scrollOffset += 5;
    platforms.forEach((platform) => {
      platform.position.x -= 5;
    });
    if (player.position.x < 400) {
      player.velocity.x = 5;
    }
  } else if (keys.left.pressed) {
    scrollOffset -= 5;
    platforms.forEach((platform) => {
      platform.position.x += 5;
    });

    if (player.position.x > 100) {
      player.velocity.x -= 5;
    }
  } else {
    player.velocity.x = 0;
  }

  console.log(scrollOffset);
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
  if (scrollOffset > 2000) {
    alert("You Win!");
  }
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
