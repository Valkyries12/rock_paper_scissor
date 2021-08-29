let computerScore = 0;
let playerScore = 0;
let round = 0;
var startLooping;



function startCycle() {
    if(round < 5) {
        startLooping = setInterval(looping, 200);
    } else {
        clearInterval(startLooping);
    }
    
    const finalScore = document.querySelector(".final-score");
    if(!finalScore.classList.contains("hide") && round < 5){
        finalScore.classList.toggle("hide");
    }
    
};

startCycle();

function stopCycle() {
    clearInterval(startLooping);
    setTimeout(startCycle, 1000);
};


function looping() {
    const options = ["fas fa-hand-rock", "fas fa-hand-paper", "fas fa-hand-scissors"];
    const index = Math.floor(Math.random() * 3);
    
    const scoreChoiceOne = document.querySelector("#scoreOne");
    scoreChoiceOne.setAttribute("class", `fas fa-hand-${options[index]}`);
    const scoreChoiceTwo = document.querySelector("#scoreTwo");
    scoreChoiceTwo.setAttribute("class", `fas fa-hand-${options[index]}`);
};

window.addEventListener("click", function(e) {
    if(round >= 5 && e.target.hasAttribute("data-choice")  ) {
        showHidePopup();
    }
    if(e.target.classList.contains("btn-restart") && round >= 5) {
        restartGame();
    }
    if(e.target.hasAttribute("data-choice")) {
        playGame(e);
        stopCycle();
    }
});

function showHidePopup() {
    const overlay = document.querySelector(".overlay");
    const popup = document.querySelector(".popup");
    overlay.classList.toggle("hide");
    popup.classList.toggle("hide");
};

function restartGame() {
    resetScore();
    showHidePopup();
    //clearInterval(startLooping);
    startCycle();
};

function computerPlay() {
    //retorna un string de piedra, papel o tijeras
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
};

function playRound(playerSelection, computerSelection) {
    //juega un round y retorna un string en torno a lo elegido
    const myOption = playerSelection.toLowerCase();
    let result = "";
    if(myOption === computerSelection) {
        result = "It's a tie!";
    };
    if(myOption == "rock" && computerSelection == "scissors") {
        result = "You win!";
    };
    if(myOption == "scissors" && computerSelection == "rock") {
        result = "You lost!";
    };
    if(myOption == "paper" && computerSelection == "rock") {
        result = "You win!";
    };
    if(myOption == "rock" && computerSelection == "paper") {
        result = "You lost!";
    };
    if(myOption == "paper" && computerSelection == "scissors") {
        result = "You lost!";
    };     
    if(myOption == "scissors" && computerSelection == "paper") {
        result = "You win!";
    }; 
    return result;
}

function whoWonTheGame(playerScore, computerScore) {
    //Escribe quien es el ganador 
    round += 1;
    if(round === 5) {
        const finalScore = document.querySelector(".final-score");
        const winLoseTxt = document.querySelector("#winLoseTxt");
        if(playerScore < computerScore) {
            finalScore.textContent = "You lost!";
            winLoseTxt.textContent = `You lost ${String.fromCodePoint(0x1F626)}`;
        }
        if(playerScore > computerScore) {
            finalScore.textContent = "You win!";
            winLoseTxt.textContent = `You win ${String.fromCodePoint(0x1F600)}`;
        }
        if(playerScore == computerScore) {
            finalScore.textContent = "It's a tie!";
            winLoseTxt.textContent = `It's a tie ${String.fromCodePoint(0x1F454)}`;
        }
        //finalScore.classList.toggle("hide");
        clearInterval(startLooping);
    }
}

function resetScore() {
    const scorePlayerOne = document.querySelector(".score-player-one .score");
    const scorePlayerTwo = document.querySelector(".score-player-two .score");
    const finalScore = document.querySelector(".final-score");
    computerScore = 0;
    playerScore = 0;
    round = 0;
    scorePlayerOne.textContent = 0;
    scorePlayerTwo.textContent = 0;
    finalScore.classList.toggle("hide");
}

function choosedBtn(e) {
    return e.target.getAttribute("data-choice") 
}

function addPoint(result, playerInput, computerInput) {
    const scorePlayerOne = document.querySelector(".score-player-one .score");
    const scorePlayerTwo = document.querySelector(".score-player-two .score");
    const scoreChoiceOne = document.querySelector("#scoreOne");
    const finalScore = document.querySelector(".final-score");
    finalScore.textContent = result;
    if(finalScore.classList.contains("hide")) {
        finalScore.classList.toggle("hide");
    };

    scoreChoiceOne.setAttribute("class", `fas fa-hand-${playerInput}`);

    const scoreChoiceTwo = document.querySelector("#scoreTwo");
    scoreChoiceTwo.setAttribute("class", `fas fa-hand-${computerInput}`);

        if(result.indexOf("lost") != -1) {
            computerScore += 1;
            scorePlayerTwo.textContent = computerScore;
        } 
        
        if(result.indexOf("win") != -1) {
            playerScore += 1;
            scorePlayerOne.textContent = playerScore;
        }

}

function playGame(e) {
    //inicia el juego. Partida de 5 turnos.
    const playerInput = choosedBtn(e);
    const computerInput = computerPlay();
    const result = playRound(playerInput, computerInput);
    addPoint(result, playerInput, computerInput);

    return whoWonTheGame(playerScore, computerScore);
}

