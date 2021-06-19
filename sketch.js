const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

//images
var bg;
var h1, h2;
var player1, playerSprite, player2, p2s, player3, p3s;
var thumbnail;
//sounds
var crowd, bgm, startMusic;
//buttons
var startB, shootB;

var time1, time2;

var hiding;

var gameState = "start";

var rope1;
var draged = false;

function preload() {
  bg = loadImage("Images/Court.JPG")
  h1 = loadImage("Images/hoop1.png")
  h2 = loadImage("Images/hoop2.png")
  thumbnail = loadImage("Images/thumbnail.jpg")

  player1 = loadAnimation("Images/1.png", "Images/2.png", "Images/3.png")
  player2 = loadAnimation("Images/4.png", "Images/5.png", "Images/6.png", "Images/7.png", "Images/8.png")
  player3 = loadAnimation("Images/13.png", "Images/14.png", "Images/15.png", "Images/16.png", "Images/17.png", "Images/18.png", "Images/19.png")

  crowd = loadSound("Sounds/Crowd.mp3")
  bgm = loadSound("Sounds/NbaTheme.mp3")
  startMusic = loadSound("Sounds/GTA SA Remix.mp3")

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create()
  world = engine.world

  startMusic.loop()

  hiding = createElement("h6")
  hiding.html(".").position(window.innerWidth/2.44, window.innerHeight/1.55)
  hiding.style("width", "350px")
  hiding.style("height", "200px")
  hiding.style("backgroundColor", "#08080A")

  startB = createButton().html("START").position(window.innerWidth/2.25, window.innerHeight/1.39)
  startB.style("borderRadius", "25px")
  startB.style("width", "180px")
  startB.style("height","80px")
  startB.style("backgroundColor", "#08080A")
  startB.style("color", "#F1B911")
  startB.style("fontSize", "25px")
  startB.mousePressed(changeState);
 
}

function draw() {

  Engine.update(engine) 

  if(gameState === "start") {
    background(thumbnail)
  }
  
  if(gameState === "play" || gameState === "shoot") {
  background(bg)

  ball.display()
  court.display()
  b.display()

  //time - hour and minute
  time1 = hour()
  textSize(23);
  stroke(255, 0, 0)
  strokeWeight(1.5)
  fill(255, 0, 0)
  //textFont("")
  text(time1, window.innerWidth/2.105, window.innerHeight/12.5)
  time2 = minute()
  text(time2, window.innerWidth/1.99, window.innerHeight/12.5)
  }

  textSize(20)
  fill(255)
  text("© SAISH ZADE", window.innerWidth/1.1, window.innerHeight/1.01)

  drawSprites()  

  // player 1 movements
  if(keyDown(RIGHT_ARROW) && gameState === "play") {
    playerSprite.x = playerSprite.x + 3
  }
  if(keyDown(LEFT_ARROW) && gameState === "play") {
    playerSprite.x = playerSprite.x - 3
  }
  if(keyDown(UP_ARROW) && gameState === "play") {
    playerSprite.y = playerSprite.y - 3
  }
  if(keyDown(DOWN_ARROW) && gameState === "play") {
    playerSprite.y = playerSprite.y + 3
  }
  

  if(rope1 !== undefined) {
    rope1.display()
  }
}

function changeState() {
  gameState = "play"

  startMusic.stop()
  hiding.hide()
  startB.hide()

  ball = new Ball(window.innerWidth/1.5, window.innerHeight/2)

  court = new Ground(window.innerWidth/2, window.innerHeight/1.35, window.innerWidth, 15)
  b = new Ground(window.innerWidth/1.07, window.innerHeight/3.1, 100, 100)

  h1s = createSprite(window.innerWidth/33, window.innerHeight/2.45, 50, 50)          
  h1s.addImage(h1)
  h1s.scale = 0.85

  h2s = createSprite(window.innerWidth/1.05, window.innerHeight/2.45, 50, 50)
  h2s.addImage(h2)
  h2s.scale = 0.85

  playerSprite = createSprite(window.innerWidth/9, window.innerHeight/2.13, 50, 50)
  playerSprite.addAnimation("player1", player1)
  playerSprite.scale = 0.3

  p2s = createSprite(window.innerWidth/5, window.innerHeight/2, 50, 50)
  p2s.addAnimation("player2", player2)
  p2s.scale = 0.35
  p2s.velocityX = 0.5

  p3s = createSprite(window.innerWidth/3, window.innerHeight/1.8, 50, 50)
  p3s.addAnimation("player3", player3)
  p3s.scale = 1
  p3s.velocityX = 0.5

  shootB = createButton().html("SHOOT").position(window.innerWidth/1.5, window.innerHeight/1.3)
  shootB.style("borderRadius", "25px")
  shootB.style("width", "180px")
  shootB.style("height","80px")
  shootB.style("backgroundColor", "#08080A")
  shootB.style("color", "#F1B911")
  shootB.style("fontSize", "25px")
  shootB.mousePressed(shootState);

  crowd.loop()
  bgm.loop()

}

function shootState() {
  shootB.hide()
  gameState = "shoot"

  rope1 = new Rope(ball.body, {x: window.innerWidth/1.5, y: window.innerHeight/2})
}

function mouseDragged() {
  if(gameState === "shoot") {
    Matter.Body.setPosition(ball.body, {x: mouseX, y: mouseY})
    draged = true;
  }
}

function mouseReleased() {
  if(gameState === "shoot" && draged === true) {
      rope1.fly();
  }
}
