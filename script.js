const penColorPicker = document.querySelector(".penColor");
const tileColorPicker = document.querySelector(".tileColor");
const colorModeButton = document.querySelector(".colorMode");
const rainbowBurstButton = document.querySelector(".rainbowBurst");
const clearButton = document.querySelector(".clear");
const gridSizeButton = document.querySelector(".gridSize");
const gridSize = document.getElementById("grid-size");
const saveButton = document.querySelector(".saveBoard");
const restoreButton = document.querySelector(".restoreButton");
const exportButton = document.querySelector(".exportButton");
const printButton = document.querySelector(".printButton");
const modal = document.querySelector(".modal");
const submitButton = document.querySelector(".submit");
const board = document.querySelector(".etch-a-sketch");
const overlay = document.querySelector(".overlay");

let currentColor = "#000000";
let colorMode = true;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const changeColor = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  if (!colorMode) {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else {
    e.target.style.backgroundColor = currentColor;
  }
};

function createBoard(size) {
  board.innerHTML = "";
  gridSize.value = "";
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridSizeButton.innerText = `${size} x ${size}`;
  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement("div");
    tile.classList.add("board-tile");
    tile.addEventListener("click", changeColor);
    tile.addEventListener("mouseover", changeColor);
    board.appendChild(tile);
  }
}

penColorPicker.oninput = function (e) {
  currentColor = e.target.value;
};

tileColorPicker.oninput = function (e) {
  const tiles = document.querySelectorAll(".board-tile");
  tiles.forEach((tile) => (tile.style.backgroundColor = e.target.value));
};

colorModeButton.onclick = () => {
  colorMode = true;
  colorModeButton.classList.add("active");
  rainbowBurstButton.classList.remove("active");
};

rainbowBurstButton.onclick = () => {
  colorMode = false;
  colorModeButton.classList.remove("active");
  rainbowBurstButton.classList.add("active");
};

clearButton.onclick = () => {
  const tiles = document.querySelectorAll(".board-tile");
  tiles.forEach((tile) => (tile.style.backgroundColor = "#ffffff"));
  tileColorPicker.value = "#ffffff";
};

gridSizeButton.onclick = () => {
  modal.style.display = "flex";
};

overlay.onclick = () => {
  modal.style.display = "none";
};

submitButton.onclick = () => {
  const size = gridSize.value;
  if (size >= 1 && size <= 64) {
    createBoard(size);
  }
  modal.style.display = "none";
};

saveButton.onclick = () => {
  const boardData = board.innerHTML;
  localStorage.setItem("board", boardData);
};

restoreButton.onclick = () => {
  const boardData = localStorage.getItem("board");
  if (boardData) {
    board.innerHTML = boardData;
  }
};

exportButton.onclick = () => {
  const data = new Blob([board.innerHTML], { type: "text/html" });
  const url = URL.createObjectURL(data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "etch-a-sketch.html";
  anchor.click();
};

printButton.onclick = () => {
  window.print();
};

createBoard(8);
