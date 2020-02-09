const DRAWINGS = [":)", ":D", "<3", "^_^", "^_~", '<(")', ":]", "=)"];

window.onload = function(e) {
  const drawingDiv = document.getElementById("random-drawing");
  const i = Math.floor(Math.random() * DRAWINGS.length);
  drawingDiv.innerText = DRAWINGS[i];
}