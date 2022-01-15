let canvasWidth;
let canvasHeight;
let currTextSize;
let offset;

let messageInput;
let message = "";

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

  let previewTitle = createDiv("Card Preview");
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

/* prototype for generating code */
function saveCard() {
  let code = encodeURIComponent(switchCodeAndMessage(message)).replace(/\(/g, "%28").replace(/\)/g, "%29");
  const codeField = document.getElementById("code-field");
  const innerCode = document.getElementById("url-to-copy");
  codeField.style.visibility = "visible";
  innerCode.innerText = "tiffanyq.github.io/sendit?m=" + code;  
  // reset copied button
  const copySuccess = document.getElementById("copied");
  copySuccess.style.visibility = "hidden";
}

function copyToClipboard() {
  const wholeMessage = document.getElementById("url-to-copy").innerText;
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

function hideUrlCopyBox() {
  const urlBox = document.getElementById("code-field");
  const copiedMsg = document.getElementById("copied");
  urlBox.style.visibility = "hidden";
  copiedMsg.style.visibility = "hidden";
}



window.onload = function(e) {
  setRandomSmiley();
  const inputBox = document.getElementById("message-input");
  inputBox.addEventListener("input", hideUrlCopyBox);
}



