var bground,bgroungimg
var ballloon,balloonimg
var mydatabase,dbref
var position
var firebase = []

function preload(){
  bgroundimg=loadImage("bg.png")
  balloonimg=loadAnimation("2.png","3.png","4.png")
}



function setup() {
  createCanvas(800,400);
  bground=createSprite(400, 200, 800, 400);
  bground.addImage("city",bgroundimg)
  bground.scale=0.35
  balloon=createSprite(100,300,20,20)
  balloon.addAnimation("fly",balloonimg)
  balloon.scale=0.3
  

  mydatabase = firebase.database();
  dbref=mydatabase.ref("bodyposition");
  dbref.on("value",readdata,problem);
}


function draw() {
  
  background(255,255,255); 
 
 
  if (keyDown(UP_ARROW)){
    changeposition(0,-1)
    balloon.scale=balloon.scale-0.0009
  }
  if (keyDown(LEFT_ARROW)){
    changeposition(-1,0)
  }
  if(keyDown(RIGHT_ARROW)){
    changeposition(1,0)
  }
  if (keyDown(DOWN_ARROW)){
    changeposition(0,1)
    balloon.scale=balloon.scale+0.0009
  }
  

  
  
  drawSprites();
  fill("black")
  text('Press arrows to move the balloon!',100,100);
  
}
function changeposition(x1,y1){
  
  dbref.set({
    x:position.x + x1,
    y:position.y + y1
})
}
function readdata(adata){
  position=adata.val()
  balloon.x=position.x
  balloon.y=position.y

}
function problem(){
  console.log("error in your db")
}