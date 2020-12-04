//Create variables here
var dog , happyDog , database , foodS , foodStock 
var dogImg , dogImg1

function preload(){
  //load images here
dogImg = loadImage("images/dogImg.png")
dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database(); 
  createCanvas(1200,1200 );
  dog = createSprite(600,600,10,10)
  dog.addImage(dogImg)
  dog.scale = 0.25 
  foodStock = database.ref("food")
  foodStock.on("value", readStock )
  
  
}


function draw() {  
  background(46,139,87)

  //feeding the dog 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1)
  }

  
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}

function readStock(data){ 
foodS = data.val() 
}

function writeStock (x) {
  if ( x <= 0 ) {
    x = 0 
  }
  else {
    x = x-1 
  }
  database.ref ("/").update ({
    Food:x 
  }) 
}
