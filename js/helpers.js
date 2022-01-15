/* content common to viewcard and makecard */

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

// for title: random smiley
const DRAWINGS = [":)", ":D", "<3", "^_^", "^_~", '<(")', ":]", "=)"];

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

function setRandomSmiley() {
  const drawingDiv = document.getElementById("random-drawing");
  const i = Math.floor(Math.random() * DRAWINGS.length);
  drawingDiv.innerText = DRAWINGS[i];
}





