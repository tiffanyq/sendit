let canvasWidth;
let canvasHeight;
let currTextSize;
let offset;

let message = "";
let flipped = true;

function setup() {
  // set up canvas and text size
  setCanvasAndTextSize();
  let canv = createCanvas(canvasWidth, canvasHeight);
  canv.parent("sketch-parent");
  // set up card
  textFont("serif");
  textAlign(LEFT);
  textSize(currTextSize);

  let loadButton = document.getElementById("load-button");
  loadButton.addEventListener("click", loadCard);

  let viewCardNowButton = document.getElementById("view-card-now-button");
  viewCardNowButton.addEventListener("click", showCard);

  let flipCardButton = document.getElementById("flip-card-button");
  flipCardButton.addEventListener("click", flipCard);
}

function draw() {
  clear();
  strokeWeight(4);
  stroke(200,200,200);
  rect(0, 0, canvasWidth, canvasHeight);
  // flip text
  if (flipped) {
    translate(canvasWidth, canvasHeight);
    rotate(PI);
  }
  text(message, offset/2, offset/2, canvasWidth - offset, canvasHeight - offset);
}

function windowResized() {
  setCanvasAndTextSize();
  resizeCanvas(canvasWidth, canvasHeight);
  textSize(currTextSize);
}

/* input field to load in card */
function loadCard() {
  const inputField = document.getElementById("code-input");
  code = inputField.value;
  message = switchCodeAndMessage(decodeURI(code));
  code.value = "";

  // hide code input
  const loadCardBox = document.getElementById("load-card-box");
  loadCardBox.style.display = "none";

  // ask user if they're on a laptop
  const oneMoreThing = document.getElementById("one-more-thing");
  oneMoreThing.style.display = "block";
}

/* show user the loaded card */
function showCard() {
  const oneMoreThing = document.getElementById("one-more-thing");
  const cardViewingOptions = document.getElementById("card-viewing-options");
  const sketchParent = document.getElementById("sketch-parent");
  oneMoreThing.style.display = "none";
  cardViewingOptions.style.display = "flex";
  sketchParent.style.display = "block";
}

/* flips canvas text */
function flipCard() {
  flipped = !flipped;
}