let grid = [];
let wk,bk;
function initgrid() {
  let rows = 8, cols = 8;
  grid = [];//bottom left is 0,0
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = null;
    }
  }
  let p;
  //////////////////////////////
  for (let i = 0; i < 8; i++) {
    p = new Pawn(i, 1, 'white');
    grid[i][1] = p;
    p = new Pawn(i, 6, 'black');
    grid[i][6] = p;
  }
  /////////////////////////////
  p = new Rook(0, 0, 'white');
  grid[0][0] = p;
  p = new Rook(7, 0, 'white');
  grid[7][0] = p;
  p = new Rook(0, 7, 'black');
  grid[0][7] = p;
  p = new Rook(7, 7, 'black');
  grid[7][7] = p;

  /////////////////////////////
  p = new Knight(1, 0, 'white');
  grid[1][0] = p;
  p = new Knight(6, 0, 'white');
  grid[6][0] = p;
  p = new Knight(1, 7, 'black');
  grid[1][7] = p;
  p = new Knight(6, 7, 'black');
  grid[6][7] = p;
  ////////////////////////////
  p = new Bishop(2, 0, 'white');
  grid[2][0] = p;
  p = new Bishop(5, 0, 'white');
  grid[5][0] = p;
  p = new Bishop(2, 7, 'black');
  grid[2][7] = p;
  p = new Bishop(5, 7, 'black');
  grid[5][7] = p;
  ////////////////////////////
  p = new Queen(3, 0, 'white');
  grid[3][0] = p;
  p = new Queen(3, 7, 'black');
  grid[3][7] = p;
  ///////////////////////////
  p = new King(4, 0, 'white');
  grid[4][0] = p;
  wk=grid[4][0];
  p = new King(4, 7, 'black');
  grid[4][7] = p;
  bk=grid[4][7];
  ///////////////////////////
}

///////////////////////////
function drawgrid() {

  background(220);
  let bool = true;
  for (let i = 0; i < 8; i++) {
    bool = !bool;
    for (let k = 0; k < 8; k++) {
      noStroke();
      if (bool == true) {
        fill(39, 57, 28);
        bool = false;

      }
      else {
        fill(244, 224, 175);
        bool = true;

      }

      rect(i * 100, k * 100, width / 8, width / 8, 5);

    }
  }
}

///////////////////////////
function track() {//identify grid position from mouse cordinates
  return createVector(mouseX / 100 - (mouseX / 100) % 1, mouseY / 100 - (mouseY / 100) % 1);
}

////////////////////////////variables
let f = true, arr = [], n = 20, selectedPiece = null, clickTimer = 0,turn='white';
////////////////////////////
function startscreen() {

  for (let i = 0; i < n; i++) {
    let p = new Particle(random(0, width), random(0, height), random(1, 5), random(1, 5), 0, 0, random(1, 6));
    arr.push(p);
  }
}

///////////////////////////setup
function setup() {
  createCanvas(800, 800);
  initgrid();
  startscreen();


}
/////////////////
function ld(){
  f=true;
}
///////////////////////////draw

function draw() {
  if (f == true) {
    f = start(arr, n);
  }
  else {
    //to cancel you from clicking more than a frame
    if (clickTimer == 10) {
      drawgrid();
      for (let i = 0; i < 8; i++) {
        for (let k = 0; k < 8; k++) {
          if (grid[i][k] != null) {
            grid[i][k].display();
          }
        }
      }
      //change the turn and  the piece you are holding
      let output = playTurn(selectedPiece, turn, grid,wk,bk);
      selectedPiece = output[1];
      turn = output[0];
      drawPath(selectedPiece, grid);
      //reset the timer
      if(mouseIsPressed){
        clickTimer=0;
      }
    }
    //timer
    if(clickTimer< 10){
      clickTimer++;
    }

  }
}