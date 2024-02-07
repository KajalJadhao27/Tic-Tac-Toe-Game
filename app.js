let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

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

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    // Call the function to show the draw message
  };

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};



const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;
  
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          winnerFound = true;
          break; // Exit the loop if a winner is found
        }
      }
    }
  
    if (!winnerFound && count === 9) {
      
      gameDraw();
    }
  
    if (winnerFound || count === 9) {
      disableBoxes();
    }
  };
  
  const showDrawMessage = () => {
    const drawMessage = document.getElementById("draw");
    drawMessage.classList.add("hide1");
};

document.addEventListener('DOMContentLoaded', function () {
    let newGameBtn = document.querySelector("#new-button");
    let resetBtn = document.querySelector("#reset-button");

    if (newGameBtn && resetBtn) {
        newGameBtn.addEventListener("click", resetGame);
        resetBtn.addEventListener("click", resetGame);
    } else {
        console.error("Buttons not found. Check your HTML and JavaScript code.");
    }

    // ... rest of your code ...
});


