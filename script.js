//intializing all variables
const blockSize= 10;
const rows=40;
const cols= 50;
let foodX = 40;
let foodY = 10;
let speedX = 1;
let speedY = 0;
let snakeX= 10;  
let snakeY = 10;
let snake =[[10,10]];
let backGroundColor= "#B9B7B5";
let snakeColor= "#E8583B";
let foodColor= "black";
let gameOver=false;
let score = 0;
let scorediv = document.getElementById("score");
let count=0;
const soundEffect = new Audio('music/food.mp3');
const collideEffect = new Audio('music/gameover.mp3');
let caller;
let circleRadius = blockSize/2;
const replay = document.getElementById("replay");
replay.addEventListener("click", replayfn);


window.onload = function(){
  start();
}
function replayfn(){
  console.log("sefgg");
  gameOver= false;
  start();
}
function start(){
  snakeX= 10;  
  snakeY = 10;
  speedX = 1;
  speedY = 0;
  snake =[[10,10]];
  score = 0;
  count=0;

  canvas = document.getElementById("canvas");
  canvas.height = rows*blockSize;
  canvas.width = cols*blockSize;
  const context = canvas.getContext('2d');
  //filling canvas
  context.fillStyle= backGroundColor;
  context.fillRect(0,0,500,500);
  //rendering food
  context.fillStyle= foodColor;
  context.fillRect(foodX*blockSize,foodY*blockSize,blockSize,blockSize);
  
  //event listener to control the snake
  document.addEventListener("keyup", changeDirection);
  //game loop
  gameOver=false;

  caller = setInterval(engine,100);
}

//main game engine
function engine(){

  if( gameOver){ 
    clearInterval(caller);
    alert("Game Over");
    return;
  }
  //mark Game Over when snake hits the walls
  if (snakeX>cols-1 || snakeX< 0 || snakeY>rows-1 || snakeY<0){
    gameOver=true;
    collideEffect.play();
    // alert("Game Over");
  }
  
  
  //update score
  scorediv.textContent = score;
  
  //fills the canvas with background color
  const context = canvas.getContext('2d');
  context.fillStyle= backGroundColor;
  context.fillRect(0,0,500,500);
  //renders  the food
  context.fillStyle= foodColor;
  if ((count+1)%5==0){
    context.fillStyle= "yellow";
    circleRadius = blockSize*5/8;
  }
  // context.fillRect(foodX*blockSize,foodY*blockSize,blockSize,blockSize);
  // Draw a circle inside the rectangle
  
  context.beginPath();
  context.arc(foodX*blockSize+blockSize/2, foodY*blockSize+blockSize/2, circleRadius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  circleRadius = blockSize/2;




  
  //modifying the snake
  snake.shift();
  snakeX+=speedX;
  snakeY+=speedY;
  snake.push([snakeX,snakeY]);

  //marks Game over when snake collides itself
  for (let i=0;i<snake.length-1;i++){
    if(snakeX==snake[i][0] && snakeY==snake[i][1]){
      gameOver=true;
      collideEffect.play();
      // console.log("snakeX:",snakeX,"snakeY:",snakeY,"snake",...snake);
      break;
    }
  }

  //generates new food when snake eats it
  if (snakeX===foodX && snakeY===foodY) {
    soundEffect.play();
    score+=1;
    count+=1;
    if(count==5){
      score+=4;
      count=0;
    }
    snakeX=foodX;
    snakeY=foodY;
    snake.push([foodX,foodY]);
    food();
  }

  //renders the snake
  context.fillStyle= snakeColor;
  for (let i=0;i<snake.length;i++){
    context.fillRect(snake[i][0]*blockSize,snake[i][1]*blockSize,blockSize,blockSize);
  }
  
}

// funciion to control snake by altering the speed direction
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
      speedX = 0;
      speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
      speedX = 0;
      speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
      speedX = -1;
      speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
      speedX = 1;
      speedY = 0;
    }
}

//function to update food
function food(){
  foodX= Math.floor(Math.random()*cols);
  foodY= Math.floor(Math.random()*rows);
}