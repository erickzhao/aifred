var canvas = document.querySelector("canvas");

if (window.outerWidth / window.outerHeight > 1) {
  canvas.width = 1280;
  canvas.height = 720;
} else {
  canvas.width = 720;
  canvas.height = 1280;
}
var ctx = canvas.getContext("2d");

var TAU = 2 * Math.PI;

times = [];
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(loop);
}

function StaticBall (startX, startY, startVelX, startVelY) {
  this.x = startX || 0;
  this.y = startY || 0;
  this.vel = {
    x: startVelX || 0,
    y: startVelY || 0
  };
  
  this.draw = function(ctx, can) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#354254';
    ctx.arc((this.x) | 0, (this.y) | 0, 10, 0, TAU, false);
    ctx.fill();

  } 
}




function Ball (startX, startY, startVelX, startVelY) {
  this.x = startX || Math.random() * canvas.width;
  this.y = startY || Math.random() * canvas.height;
  this.vel = {
    x: startVelX || Math.random() * 2 - 1,
    y: startVelY || Math.random() * 2 - 1
  };
  this.update = function(canvas) {
    if (this.x > canvas.width + 50 || this.x < -50) {
      this.vel.x = -this.vel.x;
    }
    if (this.y > canvas.height + 50 || this.y < -50) {
      this.vel.y = -this.vel.y;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  };
  this.draw = function(ctx, can) {
    ctx.beginPath();
    ctx.globalAlpha = .5;
    ctx.fillStyle = '#ffffff';
    ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
    ctx.fill();
  }
}

var balls = [];
for (var i = 0; i < canvas.width * canvas.height / (65*65); i++) {
  balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
}

var staticballs = [];
for (var i = 0; i < 5; i++) {
  staticballs.push(new StaticBall(canvas.width*0.3, canvas.height*0.75));
    staticballs.push(new StaticBall(canvas.width*0.3 + 40, canvas.height*0.75 + 30));
  	staticballs.push(new StaticBall(canvas.width*0.3 + 40, canvas.height*0.75 - 30));
  	staticballs.push(new StaticBall(canvas.width*0.3 - 40, canvas.height*0.75 + 30));
 	staticballs.push(new StaticBall(canvas.width*0.3 - 40, canvas.height*0.75 - 30));
  staticballs.push(new StaticBall(canvas.width/2, canvas.height*0.85));
  	staticballs.push(new StaticBall(canvas.width/2 + 40, canvas.height*0.85 + 30));
  	staticballs.push(new StaticBall(canvas.width/2 + 40, canvas.height*0.85 - 30));
  	staticballs.push(new StaticBall(canvas.width/2 - 40, canvas.height*0.85 + 30));
 	staticballs.push(new StaticBall(canvas.width/2 - 40, canvas.height*0.85 - 30));
  staticballs.push(new StaticBall(canvas.width*0.7, canvas.height*0.75));
  	staticballs.push(new StaticBall(canvas.width*0.7 + 40, canvas.height*0.75 + 30));
  	staticballs.push(new StaticBall(canvas.width*0.7 + 40, canvas.height*0.75 - 30));
  	staticballs.push(new StaticBall(canvas.width*0.7 - 40, canvas.height*0.75 + 30));
 	staticballs.push(new StaticBall(canvas.width*0.7 - 40, canvas.height*0.75 - 30));
  staticballs.push(new StaticBall(canvas.width*0.7, canvas.height*0.4));
  	staticballs.push(new StaticBall(canvas.width*0.75 + 40, canvas.height*0.4 + 30));
  	staticballs.push(new StaticBall(canvas.width*0.75 + 40, canvas.height*0.4 - 30));
  	staticballs.push(new StaticBall(canvas.width*0.75 - 40, canvas.height*0.4 + 30));
 	staticballs.push(new StaticBall(canvas.width*0.75 - 40, canvas.height*0.4 - 30));
  staticballs.push(new StaticBall(canvas.width*0.25, canvas.height*0.4));
	staticballs.push(new StaticBall(canvas.width*0.25 + 40, canvas.height*0.4 + 30));
  	staticballs.push(new StaticBall(canvas.width*0.25 + 40, canvas.height*0.4 - 30));
  	staticballs.push(new StaticBall(canvas.width*0.25 - 40, canvas.height*0.4 + 30));
 	staticballs.push(new StaticBall(canvas.width*0.25 - 40, canvas.height*0.4 - 30));

}

var lastTime = Date.now();
function update() {
  var diff = Date.now() - lastTime;
  for (var frame = 0; frame * 16.6667 < diff; frame++) {
    for (var index = 0; index < balls.length; index++) {
      balls[index].update(canvas);
    }
  }
  lastTime = Date.now();
}
var mouseX = -1e9, mouseY = -1e9;
document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function distMouse(ball) {
  return Math.hypot(ball.x - mouseX, ball.y - mouseY);
}

function draw() {
  ctx.globalAlpha=1;
  ctx.fillStyle = '#344055';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  for (var index = 0; index < balls.length; index++) {
    var ball = balls[index];
    ball.draw(ctx, canvas);
    ctx.beginPath();
    for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
      var ball2 = balls[index2];
      var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < 100) {
          ctx.strokeStyle = "#4EC49F";
          ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 150);
          ctx.lineWidth = "2px";
          ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
          ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
        }
    }
      for (var index3 = staticballs.length - 1; index3 > index; index3 += -1) {
      var ball3 = staticballs[index3];
      var dist = Math.hypot(ball.x - ball3.x, ball.y - ball3.y);
        if (dist < 100) {
          ctx.strokeStyle = "#4EC49F";
          ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 50);
          ctx.lineWidth = "20px";
          ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
          ctx.lineTo((0.5 + ball3.x) | 0, (0.5 + ball3.y) | 0);
        } 
    }
    
    ctx.stroke();
  }
  for (var index = 0; index < staticballs.length; index++) {
    var ball = staticballs[index];
    ball.draw(ctx, canvas);
    ctx.beginPath();
    for (var index2 = staticballs.length - 1; index2 > index; index2 += -1) {
   /*   var ball2 = staticballs[index2];
      var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < 100) {
          ctx.strokeStyle = "#ffffff";
          ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 150);
          ctx.lineWidth = "2px";
          ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0); 
          ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0); 
        } */
    }
    ctx.stroke();
  }
}

// Start
loop();