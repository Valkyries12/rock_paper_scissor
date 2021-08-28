let computerScore = 0;
let playerScore = 0;
let round = 0;

window.addEventListener("click", function(e) {
    if((computerScore + playerScore) >= 5  ) {
        resetScore();
    }
    if(e.target.hasAttribute("data-choice")) {
        playGame(e);
    }
});

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
        result = `It's a tie!. ${myOption} is the same as ${computerSelection}`;
    };
    if(myOption == "rock" && computerSelection == "scissors") {
        result = `You win!. ${myOption} beats scissors`;
    };
    if(myOption == "scissors" && computerSelection == "rock") {
        result = `You lose!. rock beats ${myOption}`;
    };
    if(myOption == "paper" && computerSelection == "rock") {
        result = `You win!. ${myOption} beats rock`;
    };
    if(myOption == "rock" && computerSelection == "paper") {
        result = `You lose!. paper beats ${myOption}`;
    };
    if(myOption == "paper" && computerSelection == "scissors") {
        result = `You lose!. scissors beats ${myOption}`;
    };     
    if(myOption == "scissors" && computerSelection == "paper") {
        result = `You win!. ${myOption} beats paper`;
    }; 
    return result;
}

function whoWonTheGame(playerScore, computerScore) {
    //Escribe quien es el ganador 
    round += 1;
    if(round === 5) {
        const finalScore = document.querySelector(".final-score");
        if(playerScore === computerScore) {
            finalScore.textContent = "It's a tie!";
        }
        if(playerScore < computerScore) {
            finalScore.textContent = "You lost!";
        } else {
            finalScore.textContent = "You win!";
        }
        finalScore.classList.toggle("hide");
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
    scoreChoiceOne.setAttribute("class", `fas fa-hand-${playerInput}`);

    const scoreChoiceTwo = document.querySelector("#scoreTwo");
    scoreChoiceTwo.setAttribute("class", `fas fa-hand-${computerInput}`);

    //if(result.indexOf("tie") === -1) {
        if(result.indexOf("win") === -1) {
            computerScore += 1;
            scorePlayerTwo.textContent = computerScore;
        } else {
            playerScore += 1;
            scorePlayerOne.textContent = playerScore;
        }
    //}

}

function playGame(e) {
    //inicia el juego. Partida de 5 turnos.
    const playerInput = choosedBtn(e);
    const computerInput = computerPlay();
    const result = playRound(playerInput, computerInput);
    addPoint(result, playerInput, computerInput);

    return whoWonTheGame(playerScore, computerScore);
}

