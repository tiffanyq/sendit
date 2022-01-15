let canvasWidth;
let canvasHeight;
let currTextSize;
let offset;

let message = "i hope all your emails find you well. no worries if not";
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
  describe(
    "Black text on a white background. The message is upside down if the device is upright. The message says: "
    + message
  );
}

function windowResized() {
  setCanvasAndTextSize();
  resizeCanvas(canvasWidth, canvasHeight);
  textSize(currTextSize);
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

window.onload = function() {
  setRandomSmiley();
  // decode custom message if applicable
  const queryString = window.location.search;
  const param = new URLSearchParams(queryString);
  const m = param.get('m');
  if (m) {
    let decodedMsg = switchCodeAndMessage(decodeURIComponent(m));
    message = decodedMsg;
  } else {
    const recipient = document.getElementById("recipient");
    recipient.style.display = "none";
  }
}