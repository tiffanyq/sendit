// card should have dimensions of 4x6in card
const CARD_RATIO = 1.5;

let canvasWidth;
let canvasHeight;
let currTextSize;
let offset;

let messageInput;
let message = "";

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

  textFont("serif");
  textAlign(LEFT);
  textSize(currTextSize);
  
  messageInput = document.getElementById("message-input");
  const saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", saveCard);

  let previewTitle = createDiv("Preview");
  previewTitle.position(0,-20);
  previewTitle.parent("sketch-parent");

  // add event listener to copy button
  let copyCodeButton = document.getElementById("copy-code");
  copyCodeButton.addEventListener("click", copyToClipboard);
}

function draw() {
  clear();
  strokeWeight(4);
  stroke(200,200,200);
  rect(0, 0, canvasWidth , canvasHeight);
  message = messageInput.value;
  text(message, offset/2, offset/2, canvasWidth  - offset, canvasHeight - offset);
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
/* prototype for generating code */
function saveCard() {
  let code = encodeURI(switchCodeAndMessage(message));
  const codeField = document.getElementById("code-field");
  const innerCode = document.getElementById("code-to-copy");
  codeField.style.visibility = "visible";
  innerCode.innerText = code;  
  // reset copied button
  const copySuccess = document.getElementById("copied");
  copySuccess.style.visibility = "hidden";
}

function copyToClipboard() {
  const wholeMessage = document.getElementById("message-to-copy").innerText;
  // copy to clipboard by selecting textarea content
  const temp = document.createElement('textarea');
  temp.value = wholeMessage;
  document.body.appendChild(temp);
  temp.select();
  temp.setSelectionRange(0, 99999); // for mobile
  document.execCommand('copy');
  document.body.removeChild(temp);
  
  // show success message
  const copySuccess = document.getElementById("copied");
  copySuccess.style.visibility = "visible";
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