

let currentkey = '1';

let bgc ;

let gkcount;

function runPaintbrush() {
  const canvasContainer = document.getElementById('canvasContainer');
  canvasContainer.classList.add('visible');
  setup();
}

function setup() {
    createCanvas(800, 600);
    background(255);
    smooth();
    bgc = color(255);
    gkcount = 20;
}

function draw() {
    // triggering the clear_print function
    if( keyIsPressed) {
    clear_print();
}
// triggering the newkeychoice
if(mouseIsPressed) {
  drawChoice();
}


}


function drawChoice() {
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of
  // graphic function


 // key global variable contains whatever key was last pressed
 let currentkey = key;

switch(currentkey) {
case '1':
  console.log("1");  // green line
 // let k = color(0);

 chrisblackline(color(0), mouseX, mouseY, pmouseX, pmouseY);
  break;
case '2':
  console.log("2");  // red line
  chrisTribrush(color(255,0,0), mouseX, mouseY, pmouseX, pmouseY);
  break;
case '3':
  console.log("3");  // rectanlge 3d modeling
  chris3dsculptingbrush(color(0), mouseX, mouseY, pmouseX, pmouseY);
  break;
case '4':
  console.log("4");  // shadow
chrisshadowbrush(color(255,0,0,50), mouseX, mouseY, pmouseX, pmouseY);
  break;
case '5':
  console.log("5"); 
  eraser(bgc,mouseX, mouseY,25);
   break;
case '6':
    console.log("6");  // erase with bg color
    (gkcount, mouseX, mouseY, pmouseX, pmouseY);

    if (gkcount > 255 ) {

        gkcount = 30;
    } else {
        gkcount+=3;
    }


    break;
case '7':
  console.log("7");  // triangle model test
  chrisTribrushtest(color(150,20,100), mouseX, mouseY, pmouseX, pmouseY);
  break;
case '8':
  console.log("8");  // Test Brush
  chrisshadowbrush(color(255,0,0,50), mouseX, mouseY, pmouseX, pmouseY);
  break;

  case '9':
  console.log("9");  // Test Brush
  chrisgreenline(color(0,200,55), mouseX, mouseY, pmouseX, pmouseY);
  break;

default:             // Default executes if the case labels
  console.log("None");   // don't match the switch parameter
  break;
}

}

function chrisblackline( k,  lx, ly,  px, py) {
 strokeWeight(5);
  stroke(k);
  line(lx, ly, px, py);
  console.log(mouseX);
  console.log(pmouseX);
}

function chrisgreenline( k,  lx, ly,  px, py) {
  strokeWeight(2.5);
   stroke(k);
   line(lx, ly, px, py);
   console.log(mouseX);
   console.log(pmouseX);
 }

function chrisshadowbrush( k,  lx, ly,  px, py) {
  strokeWeight(20);
   stroke(k);
   line(lx, ly, px, py);
   console.log(mouseX);
   console.log(pmouseX);
 }


function chris3dsculptingbrush(kcount, lx, ly,  px, py) {

  strokeWeight(1);
  stroke(0,kcount,0);
  //image(b,lx,ly, 30,30);
  // line(lx, ly, px, py);  
  rect(lx, ly, px, py);
  console.log(mouseX);
  console.log(pmouseX);
}

function chrisTribrush(kcount, lx, ly,  px, py) {

  strokeWeight(random(1,35));
  stroke(0,kcount,0);
  //image(b,lx,ly, 30,30);
  triangle(lx, ly, px, py);  
  console.log(mouseX);
  console.log(pmouseX);
}

function chrisTribrushtest(kcount, lx, ly,  px, py) {

  strokeWeight(random(1,35));
  stroke(0,kcount,0);
  //image(b,lx,ly, 30,30);
  triangle(lx, 75, ly, 20, px, py);  
  console.log(mouseX);
  console.log(pmouseX);
}

function chrisCirclebrush(kcount, lx, ly,  px, py) {

  strokeWeight(0);
  stroke(0);
  //image(b,lx,ly, 30,30);
  ellipse(kcount,lx, ly, px, py);  
  console.log(mouseX);
  console.log(pmouseX);
}

function eraser( k, lx, ly, sz) {
  stroke(k);
  ellipse(lx, ly, sz,sz);
}


function clear_print() {

  if (key == 'x' || key == 'X') {
     background(255);
  } else if (key == 'p' || key == 'P') {
    saveFrames('paintImage', 'png', 1, 25, data => {
    print(data);
  });
     //this will save the name as the intials and a random counting number.
     // it will always be larger in value then the last one.
     //delay(100);
  }


}



//
// >20
// >>30
// 35
// 30
// 20
// 10
// 30
// 80
// 100
// 120
// 80
