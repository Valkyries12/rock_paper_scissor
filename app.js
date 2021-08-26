function computerPlay() {
    //retorna un string de piedra, papel o tijeras
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
};
//hacer ui con tres botones de piedra , papel o tijera en vez del prompt.
//remover la logica de jugar 5 rounds
//agregar a caada boton un listener que llaame a playRound() con el playerSelection cuando es clickado dicho boton (se puede mantener los console.log)
//crear un div que muestre los resultados y cambiar los  console.log por DOM methods
//mostrar los puntaajes y anunciar al ganador una vez que un jugador llegue a los 5 puntos  
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
    //retorna quien es el ganador 
    if(playerScore === computerScore) {
        return "It's a tie!!";
    }
    if(playerScore < computerScore) {
        return "You lose the game!!";
    } else {
        return "You win the game!!";
    }
}


function playGame() {
    //inicia el juego. Partida de 5 turnos.
    let playerScore = 0;
    let computerScore = 0;
    /*for(let i = 0; i < 5; i++) {
        let playerInput = prompt("Ingresa rock, paper o scissor:");
        let result = playRound(playerInput, computerPlay());
        console.log(result);
        if(result.indexOf("win") === -1) {
            computerScore += 1;
        } else {
            playerScore += 1;
        }
    }*/
    return whoWonTheGame(playerScore, computerScore);
}

console.log(playGame());