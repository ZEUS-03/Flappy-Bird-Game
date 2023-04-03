const cvs = document.getElementById("frame");
const ctx = cvs.getContext("2d"); // returns methods and properties used to draw on canvas

// GAME VARS AND CONSTS
let frames = 0; // variable to keep treack of how many frames are drawn

// LOAD SPRITE IMAGE
let sprite = new Image();
sprite.src = "img/sprite.png";

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
};

const bird = {
  animation: [
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
  draw: function () {
    let bird = this.animation[this.frame];
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  },
};

// DRAW FUNCTION
function draw() {
  ctx.fillStyle = "#70c5ce"; //giving color to the canvas rectangle
  ctx.fillRect(0, 0, cvs.width, cvs.height); // filling canvas with a rectangle
  bg.draw();
  fg.draw();
  bird.draw();
}

// UPDATE FUNCTION
function update() {}

// LOOP FUNCTION
function loop() {
  update(); // function to update the state
  draw(); // function to clear the previous frame
  frames++;

  requestAnimationFrame(loop); // function to schedule animation and efficient way to create smooth animations
}

loop();
