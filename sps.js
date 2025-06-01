let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choose");
const userScorePara = document.getElementById("user-score");
const compScorePara = document.getElementById("comp-score");
const msg = document.getElementById("msg");

// Modal
const popup = document.getElementById("popup-modal");
const popupText = document.getElementById("popup-text");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

// Sounds
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const drawSound =new Audio ("draw.mp3");

const genCompChoice = () => {
  const options = ["stone", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a Draw! 🤝";
  msg.style.backgroundColor = "gray";
  drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! 🎉 ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lose! ❌ ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    loseSound.play();
  }

  setTimeout(() => {
    popupText.innerText = msg.innerText;
    popup.classList.remove("hidden");
  }, 1000);
};

const playGame = (userChoice) => {
  
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
    drawSound.play();
    setTimeout(() => {
      popupText.innerText = "It's a Draw! 🤝";
      popup.classList.remove("hidden");
    }, 1000);
  } else {
    let userWins = false;

    if (
      (userChoice === "stone" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "stone") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      userWins = true;
    }

    showWinner(userWins, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    clickSound.play();
    
  });
});

yesBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  msg.innerText = "New round! 🔁 Play your move.";
  msg.style.backgroundColor = "#1e90ff";
  gameEnded = false; // reset the flag to allow next exit flow
});

let gameEnded = false;

noBtn.addEventListener("click", () => {
  popup.classList.add("hidden");

  // Step 1: Show thanks message
  msg.innerText = "Thanks for playing! 🎮";
  msg.style.backgroundColor = "black";

  // Step 2: Reset score
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;

  // Step 3: Ask again after 2 seconds (only once)
  if (!gameEnded) {
    gameEnded = true; // avoid infinite loop

    setTimeout(() => {
      popupText.innerText = "Do you want to play again? 🔁";
      popup.classList.remove("hidden");
    }, 2000);
  }
});

let modebtn=document.querySelector("#mode");
let body= document.querySelector("body");
let curMode="dark";

modebtn.addEventListener("click",()=>{
    if(curMode==="dark"){
        curMode="light";
        body.classList.add("light");
        body.classList.remove("dark");
    }else{
        curMode="dark";
        body.classList.add("dark");
        body.classList.remove("light");
    }
    console.log(curMode);
});
