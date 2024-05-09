const selectTheme = document.querySelectorAll(".img-icons-theme");
const playersBtn = document.querySelectorAll(".select-players");
const gridSize = document.querySelectorAll(".grid-size");
const startBtn = document.querySelector(".start");
let theme = 0;
let players = 1;
let grids = 4;
let prevThemeBtn = selectTheme[0];
let prevPlaterBtn = playersBtn[0];
let prevGridSize = gridSize[0];

//Logic or theme
selectTheme.forEach((themeBtn) => {
  themeBtn.addEventListener("click", (e) => {
    let currentTheme = e.target;
    currentTheme.classList.add("btn-active");
    prevThemeBtn.classList.remove("btn-active");
    prevThemeBtn = currentTheme;
    if (currentTheme == selectTheme[0]) {
      theme = 0;
    } else {
      theme = 1;
    }
  });
});
//Logic for grid
gridSize.forEach((grid) => {
  grid.addEventListener("click", (e) => {
    let currerntGridSize = e.target;
    currerntGridSize.classList.add("btn-active");
    prevGridSize.classList.remove("btn-active");
    prevGridSize = currerntGridSize;
    if (currerntGridSize == gridSize[0]) {
      grids = 4;
    } else {
      grids = 6;
    }
  });
});
//Logic for players
playersBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    let currentBtn = e.target;
    currentBtn.classList.add("btn-active");
    prevPlaterBtn.classList.remove("btn-active");
    prevPlaterBtn = currentBtn;
    if (currentBtn == playersBtn[0]) {
      players = 1;
    }
    if (currentBtn == playersBtn[1]) {
      players = 2;
    }
    if (currentBtn == playersBtn[2]) {
      players = 3;
    }
    if (currentBtn == playersBtn[3]) {
      players = 4;
    }
  });
});

const mainGameContainer = document.querySelector(".main-game-container");
const mainContainer = document.querySelector(".main-container");
const playerBtnTime = document.querySelector(".players-1-time");
const playerBtncontainer = document.querySelector(".players-btn-container");
const gameGridContainer = document.querySelector(".game-grids-container");
const winGameContainer = document.querySelector(".win-container");

const emojies = [
  "😃",
  "😃",
  "🤣",
  "🤣",
  "😋",
  "😋",
  "😎",
  "😎",
  "😥",
  "😥",
  "😣",
  "😣",
  "🙄",
  "🙄",
  "😪",
  "😪",
];
const emojies1 = [
  "😃",
  "😃",
  "🤣",
  "🤣",
  "😋",
  "😋",
  "😎",
  "😎",
  "😥",
  "😥",
  "😣",
  "😣",
  "🙄",
  "🙄",
  "😪",
  "😪",
  "😌",
  "😌",
  "😛",
  "😛",
  "😕",
  "😕",
  "😖",
  "😖",
  "😡",
  "😡",
  "😻",
  "😻",
  "😫",
  "😫",
  "😐",
  "😐",
  "😱",
  "😱",
  "😬",
  "😬",
];
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const numbers1 = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
  13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
];
let copyArr16 = numbers;
let copyArr36 = numbers1;

startBtn.addEventListener("click", gameContainer);

const mintSpan = document.querySelector(".minutes");
const secodSpan = document.querySelector(".seconds");

let player1 = 0;
let player2 = 0;
let player3 = 0;
let player4 = 0;

let minutes = 0;
let seconds = 0;
let playersTurn = [];
let currentPlayer = "";
function gameContainer() {
  mainContainer.style.display = "none";
  mainGameContainer.style.display = "block";

  //for players button
  if (players > 1) {
    playerBtnTime.remove();
    for (let i = 0; i < players; i++) {
      let newBtn = document.createElement("div");
      newBtn.classList.add("players-btn");
      newBtn.innerHTML = `<div class="text">player ${i + 1}</div>
      <div class="mover">0</div>`;
      playersTurn.push({
        button: newBtn,
        isTurn: i == 0,
        playerPairs: 0,
      });
      if (i === 0) {
        currentPlayer = playersTurn[i];
        console.log(currentPlayer.button);
        currentPlayer.button.classList.add("players-active-btn");
      }
      playerBtncontainer.appendChild(newBtn);
    }
  } else {
    setInterval(function () {
      if (seconds == 59) {
        minutes = minutes + 1;
        seconds = 0;
        if (minutes < 10) mintSpan.innerHTML = "0" + minutes;
        else mintSpan.innerHTML = minutes;
      } else {
        seconds = seconds + 1;
        if (seconds < 10) secodSpan.innerHTML = ":0" + seconds;
        else secodSpan.innerHTML = ":" + seconds;
      }
    }, 1000);
    let newBtn = document.createElement("div");
    newBtn.classList.add("players-btn");
    newBtn.innerHTML = `<div class="text">player 1</div>
<div class="mover">0</div>`;
    playerBtncontainer.appendChild(newBtn);
    currentPlayer = newBtn;
    currentPlayer.classList.add("players-active-btn");
  }

  if (theme == 0) {
    copyArr16 = numbers;
    copyArr36 = numbers1;
  } else {
    copyArr16 = emojies;
    copyArr36 = emojies1;
  }

  if (grids == 4) createGameGrids(copyArr16);
  else createGameGrids(copyArr36);
}

// Function to create game grids based on the grids value (4 or 6)
function createGameGrids(copyArr) {
  const shuffledArray = copyArr.sort(() => (Math.random() > 0.5 ? 2 : -1));
  for (let i = 0; i < shuffledArray.length; i++) {
    let box = document.createElement("button");
    box.className = `game-grids game-grid-${grids}x${grids}`;
    box.innerHTML = shuffledArray[i];
    document.querySelector(".game-grids-container").appendChild(box);

    box.onclick = function gameplay() {
      this.classList.add("box-open");
      setTimeout(function () {
        if (document.querySelectorAll(".box-open").length > 1) {
          if (
            document.querySelectorAll(".box-open")[0].innerHTML ==
            document.querySelectorAll(".box-open")[1].innerHTML
          ) {
            document
              .querySelectorAll(".box-open")[0]
              .classList.add("box-match");
            document
              .querySelectorAll(".box-open")[1]
              .classList.add("box-match");
            document.querySelectorAll(".box-open")[0].onclick = null;
            document.querySelectorAll(".box-open")[1].onclick = null;
            document
              .querySelectorAll(".box-open")[1]
              .classList.remove("box-open");
            document
              .querySelectorAll(".box-open")[0]
              .classList.remove("box-open");

            if (players > 1) checkPairs();

            if (
              document.querySelectorAll(".box-match").length ==
              shuffledArray.length
            ) {
              console.log(document.querySelectorAll(".box-match").length);
              console.log("win");
              winGameContainer.style.display = "block";

              // Show an alert when all boxes are matched
              winFunction();
            }
          } else {
            document
              .querySelectorAll(".box-open")[1]
              .classList.remove("box-open");
            document
              .querySelectorAll(".box-open")[0]
              .classList.remove("box-open");
            if (players === 1) {
              player1++;
              currentPlayer.children[0].background = "red";
              currentPlayer.children[1].innerHTML = player1;
            } else playerTurn();
          }
        }
      }, 500);
    };
  }
}

function playerTurn() {
  const currentPlayerIndex = playersTurn.findIndex((player) => player.isTurn);
  playersTurn[currentPlayerIndex].isTurn = false;
  playersTurn[currentPlayerIndex].button.classList.remove("players-active-btn");

  const currentPlayerName =
    playersTurn[currentPlayerIndex].button.querySelector(".text").textContent;

  if (currentPlayerName === "player 1") {
    player1++;
    playersTurn[currentPlayerIndex].button.querySelector(".mover").innerHTML =
      player1;
  } else if (currentPlayerName === "player 2") {
    player2++;
    playersTurn[currentPlayerIndex].button.querySelector(".mover").innerHTML =
      player2;
  } else if (currentPlayerName === "player 3") {
    player3++;
    playersTurn[currentPlayerIndex].button.querySelector(".mover").innerHTML =
      player3;
  } else if (currentPlayerName === "player 4") {
    player4++;
    playersTurn[currentPlayerIndex].button.querySelector(".mover").innerHTML =
      player4;
  }

  const nextPlayerIndex = (currentPlayerIndex + 1) % playersTurn.length;
  playersTurn[nextPlayerIndex].isTurn = true;
  currentPlayer = playersTurn[nextPlayerIndex];
  playersTurn[nextPlayerIndex].button.classList.add("players-active-btn");
}

function checkPairs() {
  const currentPlayerName =
    currentPlayer.button.querySelector(".text").textContent;
  if (currentPlayerName === "player 1") {
    playersTurn[0].playerPairs++; // Increment player 1's pair count
  } else if (currentPlayerName === "player 2") {
    playersTurn[1].playerPairs++; // Increment player 1's pair count
  } else if (currentPlayerName === "player 3") {
    playersTurn[2].playerPairs++; // Increment player 1's pair count
  } else if (currentPlayerName === "player 4") {
    playersTurn[3].playerPairs++; // Increment player 1's pair count
  }
}

const winnerPlayer = document.querySelector(".winner-player");
const playersRankContainer = document.querySelector(".players-name-container");

function winFunction() {
  const sortedPlayers = [...playersTurn];

  sortedPlayers.sort((a, b) => b.playerPairs - a.playerPairs);
  winnerPlayer.innerHTML =
    sortedPlayers[0].button.querySelector(".text").textContent + "wins!";

  for (let i = 0; i < playersTurn.length; i++) {
    let newPlayerDiv = document.createElement("div");
    newPlayerDiv.classList.add("player-name");
    newPlayerDiv.innerHTML = `<span>${
      sortedPlayers[i].button.querySelector(".text").textContent
    }</span> <span>${sortedPlayers[i].playerPairs}</span>`;
    playersRankContainer.appendChild(newPlayerDiv);
  }
}
