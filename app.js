let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".game-result-bar");
let msg = document.querySelector("#result");
let gameBar = document.querySelector("main");

let winner = false;
let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    if (count === 9) {
      gameDraw(count);
    }
  });
});

const gameDraw = (count) => {
  if (count == 9 && winner == false) {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    gameBar.classList.add("hide");
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winner = true;
        setTimeout(() => {
          msgContainer.classList.remove("hide");
          msg.innerText = `Congratulations, Winner is ${pos1Val}`;
          gameBar.classList.add("hide");
        },1000);
        diableAllBtns();
      }
    }
  }
};

function diableAllBtns() {
  for (box of boxes) {
    box.disabled = true;
  }
}

function enableAllBtns() {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
}

newGameBtn.addEventListener("click", ()=> {
  winner = false;
  turnO = true;
  count = 0;
  enableAllBtns();
  msgContainer.classList.add("hide");
  gameBar.classList.remove("hide");
});

resetBtn.addEventListener("click", ()=> {
  winner = false;
  turnO = true;
  count = 0;
  enableAllBtns();
});