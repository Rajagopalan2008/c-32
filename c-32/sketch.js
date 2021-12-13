var coin, coinImage, coinfunc, coinGroup, spaceShip,  spaceShipImage, bgImg, bg
var obstacle, obstacle_func, obs_img, gameOver,  obstacle_group, score=0, number_coins=0, gamestate = 1, scor=0, lives=3

function preload(){
coinImage = loadImage("Coins.png")
spaceShipImage=loadImage("Spaceship.jpg");
bgImg=loadImage("images.jpg");
obs_img=loadImage("rock.jpg");
gameOver=loadImage("game_over.jpg");
}

function setup() {
 createCanvas(450,400);
  
  //to create the groups
  obstacle_group=new Group();
  coinGroup=new Group();
  
  //background
  bg=createSprite(200,200,20,20);
  bg.addImage(bgImg);  
  bg.scale=2;
  bg.velocityY=10
  
  //spaceShip
  spaceShip=createSprite(200,350,40,40);
  spaceShip.addImage("spaceship", spaceShipImage);
  spaceShip.scale=0.15;
  
}

function draw() {
   background(255,140,0);
   drawSprites();

  if(gamestate===1){
  fill("yellow");
  textSize = 30;
  text("score: " + score, 200 ,50);
  score+=1;
    
  fill("orange");
  textSize=30;
  text("points" + scor, 280, 50);
    
  if(coinGroup.isTouching(spaceShip)){
    scor+=1;
    coinGroup.destroyEach();
  }
    
  if(frameCount % 800 === 0){
    bg.velocityY += 5;
    coin.velocityY += 5;
    obstacle.velocityY += 5;
  }
  
    //to call the functions
  obstacle_func();
  coinfunc();
  
  if(keyDown("right_arrow")){
    spaceShip.x+=50;
  }
    
  if(keyDown("left_arrow")){
    spaceShip.x-=50;
  }
  
  if(bg.y>300){
  bg.y=200
  }
  
  }
  if(obstacle_group.isTouching(spaceShip)){
    lives-=1;
  }
  
  if(lives<0){
    gamestate=0
  }
  
  text("lives"+lives,350,50);
  
      if(gamestate===0){
     gotOut()
    }
}

function obstacle_func(){
  if(frameCount % 60 === 0){
obstacle=createSprite(Math.round(random(10,390)),-50,20,20);
  obstacle.addImage("rocks",obs_img);
  obstacle.scale=0.15;
  obstacle.velocityY=10;
    
    // to add the sprite to the obstacle group
    obstacle_group.add(obstacle);
  }
}

function coinfunc(){
  if(frameCount % 83 === 0){
    //coins
coin=createSprite(Math.round(random(10,390)),-50,20,20);
coin.addImage("coins",coinImage);
coin.velocityY=10;
coin.scale=0.10;
    
    //to add the sprites to the coin group
    coinGroup.add(coin);
  }
}
function gotOut(){
  bg.addImage(gameOver);
   bg.velocityY=0;
   bg.y=200;
   spaceShip.destroy();
   obstacle_group.destroyEach();
   coinGroup.destroyEach();
}