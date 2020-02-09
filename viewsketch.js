// card should have dimensions of 4x6in card
const CARD_RATIO = 1.5;

let canvasWidth;
let canvasHeight;
let currTextSize;
let offset;

let message = "";
let flipped = true;

const ALPHABET = {
  "a": "n",
  "b": "o",
  "c": "p",
  "d": "q",
  "e": "r",
  "f": "s",
  "g": "t",
  "h": "u",
  "i": "v",
  "j": "w",
  "k": "x",
  "l": "y",
  "m": "z",
  "n": "a",
  "o": "b",
  "p": "c",
  "q": "d",
  "r": "e",
  "s": "f",
  "t": "g",
  "u": "h",
  "v": "i",
  "w": "j",
  "x": "k",
  "y": "l",
  "z": "m"
}

const NUMBERS = {
  "0": "5",
  "1": "6",
  "2": "7",
  "3": "8",
  "4": "9",
  "5": "0",
  "6": "1",
  "7": "2",
  "8": "3",
  "9": "4"
}

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

/* sets canvas and text based on current window width */
function setCanvasAndTextSize() {
  if (windowWidth > 1529) {
    canvasWidth = 1200;
    canvasHeight = 800;
    currTextSize = 64;
    offset = 100;
  } else if (windowWidth > 929) {
    canvasWidth = 900;
    canvasHeight = 600;
    currTextSize = 48;
    offset = 75;
  } else {
    canvasWidth = 600;
    canvasHeight = 400;
    currTextSize = 32;
    offset = 50;
  }
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

/* switches between code form and message form */
function switchCodeAndMessage(content) {
  const characters = content.split("");
  let switchedContent = "";
  let nextLetter;
  for (let i = 0; i < characters.length; i++) {
    currChar = characters[i].toLowerCase();
    if (currChar in ALPHABET) {
      nextLetter = ALPHABET[currChar];
      // ensure character is the correct case
      if (currChar !== characters[i]) {
        nextLetter = nextLetter.toUpperCase();
      }
    }
    else if (currChar in NUMBERS) {
      nextLetter = NUMBERS[currChar];
    }
    else {
      nextLetter = currChar;
    }
    switchedContent += nextLetter;
  }
  return switchedContent;
}