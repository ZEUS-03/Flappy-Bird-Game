const cvs = document.getElementById("frame");
const ctx = cvs.getContext("2d"); // returns methods and properties used to draw on canvas
const DEGREE = Math.PI / 180;

// GAME VARS AND CONSTS
let frames = 0; // variable to keep treack of how many frames are drawn

// LOAD SPRITE IMAGE
let sprite = new Image();
sprite.src = "img/sprite.png";

// GAME STATE

const gameState = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

// changing states
cvs.addEventListener("click", (e) => {
  switch (gameState.current) {
    case gameState.getReady:
      gameState.current = gameState.game;
      break;
    case gameState.game:
      bird.flap();
      break;
    case gameState.over:
      gameState.current = gameState.getReady;
      break;
  }
});

// BACKGROUND
const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cvs.height - 226,

  draw: function () {
    //function for background
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

// FOREGROUND

const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,
  dx: 2,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
  update: function () {
    if (
      gameState.current == gameState.over ||
      gameState.current == gameState.getReady
    ) {
      this.x = 0;
    } else {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
  },
};

// GET READY MESSAGE

const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - 173 / 2,
  y: 80,

  draw: function () {
    if (gameState.current == gameState.getReady) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// GAME OVER MESSAGE
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (gameState.current == gameState.over) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

const bird = {
  animation: [
    // bird's flap positions
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],

  x: 50,
  y: 150,
  w: 32,
  h: 26,

  frame: 0,

  speed: 0,
  jump: 4,
  gravity: 0.2,
  period: 0,
  rotation: 0,

  draw: function () {
    let bird = this.animation[this.frame]; // cropping bird instance from image
    ctx.save();
    ctx.translate(this.x, this.y); // rotating the canvas by chaging the position of x and y
    ctx.rotate(this.rotation);
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );
    ctx.restore();
  },
  flap: function () {
    this.speed = -this.jump;
  },

  update: function () {
    this.period = gameState.current == gameState.getReady ? 10 : 5;
    this.frame += frames % this.period == 0 ? 1 : 0;
    this.frame = this.frame % this.animation.length;

    if (gameState.current == gameState.getReady) {
      this.y = 150;
      this.speed = 0;
      this.rotation = 0 * DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.y + this.h / 2 >= cvs.height - fg.h) {
        this.y = cvs.height - this.h / 2 - fg.h;
        if (gameState.current == gameState.game) {
          gameState.current = gameState.over;
        }
      }
      if (this.speed >= this.jump) {
        this.rotation = 90 * DEGREE;
        this.frame = 1; // falling bird does not flap
      } else {
        this.rotation = -25 * DEGREE;
      }
    }
  },
};

// DRAW FUNCTION
function draw() {
  ctx.fillStyle = "#70c5ce"; //giving color to the canvas rectangle
  ctx.fillRect(0, 0, cvs.width, cvs.height); // filling canvas with a rectangle
  bg.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}

// UPDATE FUNCTION
function update() {
  bird.update();
  fg.update();
}

// LOOP FUNCTION
function loop() {
  update(); // function to update the state
  draw(); // function to clear the previous frame
  frames++;

  requestAnimationFrame(loop); // function to schedule animation and efficient way to create smooth animations
}

loop();
