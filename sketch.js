var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkeyImage;
var banana ,bananaImage
var obstacle,obstacleImage
var foodGroup,obstacleGroup
var ground;
var score;
var survivalTime =0;
var restart,restartImage;
var jungle,jungleImage;
var road,roadImage;
   
function preload(){
  jungleImage=loadImage("b.jpg");
  monkey_running = loadAnimation("bicycle1.png","bicycle1 - Copy.png","bicycle1 - Copy (2).png","bicycle2.png","bicycle2 - Copy.png","bicycle2 - Copy (2).png","bicycle3.png","bicycle3 - Copy.png","bicycle3 - Copy (2).png","bicycle4.png","bicycle4 - Copy.png","bicycle4 - Copy (2).png","bicycle6.png","bicycle6 - Copy.png","bicycle6 - Copy (2).png","bicycle8.png","bicycle8 - Copy.png","bicycle8 - Copy (2).png");
  bananaImage = loadImage("energy.png");
  obstacleImage = loadImage("bump.png");
  restartImage = loadImage("restart_icon-removebg-preview.png");
  roadImage = loadImage("road.jpg");
  monkeyImage = loadAnimation("bicycle5.png","bicycle5 - Copy.png");
}
function setup() {
  createCanvas(650,650)
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  //jungle = createSprite(1200,200,2000,200);
  //jungle.addImage(jungleImage);
  //jungle.scale = 0.5;

  road = createSprite(20,displayHeight-90,900,700);
  road.addImage(roadImage);
  road.scale = 3.2;
  road.velocityX = -4;
  road.x = displayWidth/2;
  

// Creating monkey
  monkey = createSprite(80,displayHeight-300,20,20);
  monkey.addAnimation("running",monkeyImage);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 1.5;

// Creating ground
  ground = createSprite(10,displayHeight-100,900,50);
  //ground.velocityX = -94;
  //ground.x = ground.width/2;
  ground.shapeColor="#222A2C";
  ground.visible=false;
  console.log(ground.x);
  score = 0;
  survivalTime=0;
  restart = createSprite(300,230);
   restart.addImage(restartImage);
   restart.scale = 0.1
}
function draw() {
  background(jungleImage);
  //jungle.velocity = -4;
 //jungle.x = jungle.width/2;
if (gameState === PLAY){
  restart.visible = false;
    survivalTime = survivalTime + Math.ceil(frameCount % 10 === 0)

// Make the ground sprite move half its width
  //ground.x = ground.width/2;
   //road.x = road.width/2;
  //if (road.x < 0){
   // road.x = 380;
   //}  

   if (road.x < 0){
    // road.x = 800;
     road.x = displayWidth/2;
    } 

// Make the monkey collide with ground
  monkey.collide(ground);

// Make the monkey jump when space key is pressed
if(keyWentDown("space")){
  monkey.velocityY = -12;
} 
// Add gravity
  monkey.velocityY = monkey.velocityY + 0.8  ;
         
// Create function for Food and obstacles
  Bananas();
  Obstacles(); 

  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score+5;
 }
if(monkey.isTouching(obstacleGroup)){
       gameState = END;
}
}
//Creating Gamestate "END"
 if (gameState === END) {
    restart.visible = true;
    foodGroup.destroyEach();
 obstacleGroup.destroyEach();
 foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
   monkey.velocityY = monkey.velocityY + 0.8  ;
   monkey.changeAnimation("sitting",monkeyImage)
    road.velocityX = 0;   
    score=0;
    survivalTime=0;
    monkey.collide(ground);
    fill("black");
    textSize(50);
    text("Game Over",200,200);
if(mousePressedOver(restart)){
  reset();
}
} 
  drawSprites();
  textSize(20);
  fill("red");
  text("Score: " + score,450,50);
  
  textSize(20);
  fill("Purple");
  text("Survival Time: " + survivalTime,450,75);
  
  
}
function reset(){
  gameState = PLAY;
  restart.visible = false;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  road.velocityX = -4
  if (road.x < 0){
    // road.x = 800;
     road.x = displayWidth/2;
    } 
  score=0;
  survivalTime=0;
}
// Creating function for bananas
function Bananas(){
if(World.frameCount % 200 === 0){
    banana = createSprite(600,250,40,10);
      banana.scale = 0.2;
  r = Math.round(random(1,4));
   if(r == 1) {
   banana.addImage(bananaImage);
 } else if (r == 2) {
   banana.addImage(bananaImage)
 }else if (r == 3){
   banana.addImage(bananaImage);
 }else 
   banana.addImage(bananaImage);
    banana.y = Math.round(random(300,400));
   // banana.addImage(bananaImage);
    banana.velocityX = -3;
    //banana.lifetime = 0;
    foodGroup.add(banana);
}
}
// Creating function for obstacles
function Obstacles(){
if (frameCount % 200 === 0){
   obstacle = createSprite(400,600,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.4;
   obstacle.setCollider("rectangle",10,30,200,190)
   obstacle.velocityX = -4;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
}
}