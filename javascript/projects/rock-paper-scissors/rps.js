const choices = {
    //must be in ascending power order
    0: "Rock",
    1: "Paper",
    2: "Scissors"
}

let playerScore = 0;
let computerScore = 0;
let winningScore = 5;
let currentRound = 1;

/* 
function game(){
    //let rounds = Number(prompt("Please enter the number of rounds"));

    if (rounds == null || isNaN(rounds) ){
        alert("Must be a number. Please try again.");
        game();
    }

    for (let i = 0; i < rounds; i++){
        let playerSelection = prompt(`Round ${i+1}
        Please enter 'rock', 'paper' and 'scissors'`).toLowerCase();

        console.log(`player selection is ${playerSelection}`);
        if (playerSelection == "rock" || playerSelection == "paper" || playerSelection == "scissors") {
            const computerSelection = getComputerChoice();
            playRound(playerSelection, computerSelection);
        } else {
            alert("Invalid entry. Must be 'rock', 'paper' or 'scissors'. Please try again.");

            i--;
        }

    }

    let finalString = "";
    if (playerScore === computerScore){
        finalString = "It's a draw."
    } else {
        finalString = playerScore > computerScore ? "Player wins!" : "Computer wins!";
    }

    alert(`Final score:
    Player: ${playerScore}
    Computer: ${computerScore}
    ${finalString}`);

} */

function playerMakeSelection(event){
    //get player choice
    //use event.currentTarget to get the whole button
    const playerSelection = event.currentTarget.querySelector(".choice-text").textContent;
    //console.log(`player chooses ${playerSelection}`)

    //get computer choice
    const computerSelection = getComputerChoice();

    //play round
    playRound(playerSelection, computerSelection);

    //update scores
    updateScore();
};

function getComputerChoice(){
    return choices[Math.floor(Math.random() * Object.keys(choices).length)];
}

function playRound(playerSelection, computerSelection){
    //get keys of selections
    let player = Object.keys(choices).find(key => choices[key].toUpperCase() == playerSelection.toUpperCase());
    let computer = Object.keys(choices).find(key => choices[key].toUpperCase() == computerSelection.toUpperCase());
    player = parseInt(player);
    computer = parseInt(computer);

    //get ready commentary
    const commentary = document.querySelector(".commentary");

    //draw
    if (player === computer){
        commentary.textContent = `It's a Draw. Both chose ${choices[player]}.`;
        return;
    }

    //case for player = scissors and computer = rock
    if (player >= 2 && computer === 0){
        //player lose
        //console.log("case 1")
        commentary.textContent = `You lost the round! The computer's ${choices[computer]} beats your ${choices[player]}`;
        computerScore += 1;
        return;
    }

    //case for player = rock and computer = scissors
    if (computer >= 2 && player === 0){
        //player win
        //console.log("case 2")
        commentary.textContent = `You won the round! Your ${choices[player]} beats the computer's ${choices[computer]}`;
        playerScore += 1;
        return;
    }
    
    //other consecutive cases
    if (computer > player){
        //player lose
        //console.log("case 3")
        commentary.textContent = `You lost the round! The computer's ${choices[computer]} beats your ${choices[player]}`;
        computerScore += 1;
        return;
    } else {
        //player win
        //console.log("case 4")
        commentary.textContent = `You won the round! your ${choices[player]} beats the computer's ${choices[computer]}`;
        playerScore += 1;
        return;
    }

    

}

function updateScore(){
    //check player score display
    const playerScoreDisplay = document.querySelector(`.scoreboard-score[data-key="player"]`)
    playerScoreDisplay.textContent = playerScore;

    //check computer score display
    const computerScoreDisplay = document.querySelector(`.scoreboard-score[data-key="computer"]`)
    computerScoreDisplay.textContent = computerScore;

    currentRound += 1;
    checkEndGameCondition();
}

function checkEndGameCondition(){
    if (playerScore >= winningScore || computerScore >= winningScore) endGame();
}

function endGame(){
    //initialize commentary
    let finalString = "";
    if (playerScore === computerScore){
        finalString = "It's a draw."
    } else {
        finalString = playerScore > computerScore ? "Player wins!" : "Computer wins!";
    }
    const commentary = document.querySelector(".commentary");
    commentary.textContent = finalString;

    //deactivate buttons
    deactivateButtons();

    //activate play again button
    playAgainButton.classList.remove("invisible");
}

function startGame(){
    //initialize scoring
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    const scoreNumbers = document.querySelectorAll(".scoreboard-score");
    scoreNumbers.forEach(score => score.textContent = 0);

    //initialize commentary
    const commentary = document.querySelector(".commentary");
    commentary.textContent = "Click the above options to start the game"

    //activate buttons
    activateButtons();

    //deactivate play again button
    playAgainButton.classList.add("invisible");
    
}

const playAgainButton = document.querySelector(".play-again-button");
playAgainButton.addEventListener('click', startGame);

const buttons = document.querySelectorAll(".choice");

function activateButtons(){
    buttons.forEach(button => {
        button.addEventListener('click', playerMakeSelection, {capture:true});
    })
}

function deactivateButtons(){
    buttons.forEach(button => {
        button.removeEventListener('click', playerMakeSelection, {capture:true});
    })
}

startGame();