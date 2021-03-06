/*
GAME RULES: The Pig Game

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScores, activePlayer, gamePlaying;


// clear the board
init();

//you can replace the call back function, with an actual function, this would be considered "anonymous function" and cannot be called.
//'click' = event, btn = call back function
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Random the dice between 1 - 6
        var dice = rollDice();

        var x = final_Score();
        //check to see if the last dice vs the current dice are not both sixes
        if (dice[0] === 6 && dice[1] === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            window.alert("Player " + (activePlayer+1) + " rolled double 6's. \nSorry you lose all your points ????");
            nextPlayer();
        } else if (dice[0] === 1 || dice[1] === 1) {
            window.alert("Player " + (activePlayer+1) + " rolled a 1. \nYou lose only your current points ????");
            nextPlayer();
        } else {

            // 2. Display the result
            var diceDOM = document.querySelector('.dice');
            var diceDOM2 = document.querySelector('.dice-2');
            diceDOM.style.display = 'block';
            diceDOM2.style.display = 'block';
            diceDOM.src = 'dice-' + dice[0] + '.png';
            diceDOM2.src = 'dice-' + dice[1] + '.png';


            //Display current score
            roundScores += dice[0]+ dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScores;

        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScores;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= final_Score()) {

            //Tells the users who won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //does not let the game continue
            gamePlaying = false;
        } else {
            //Next player turn
            nextPlayer();
        }
    }
});

//Next Player turn
function nextPlayer() {
    // this is a simpler if statement || : = else || this is called tannery operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // This will clear the board without clearing global score
    roundScores = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // This will toggle the active class from play 1 & 2
    //toggle = if "active is in the class, remove active, else add active
    //you could replace toggle with add and remove, but toggle makes life easier :)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide the dice image
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0]; //score array for player 1 and 2
    roundScores = 0; //current round score, this will be added to the total of the player score
    activePlayer = 0; //player 1 = 0, player 2 = 1, this matches with array "score"
    gamePlaying = true; //lets the player play the game

    // . = class || # = id || hides dice img (below code)
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';


    // This will set all the below values to 0 or clear the board/score
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //changes the winner text to player 1 and player 2
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //add active class to player 1
    document.querySelector('.player-0-panel').classList.add('active');
}

function final_Score() {
    var currentPlayerScore = document.querySelector('.final-score').value;
    console.log(currentPlayerScore);

    if (isNaN(currentPlayerScore) || 2500 < currentPlayerScore || currentPlayerScore < 0) {
        document.querySelector('.final-score').value = 100;
        window.alert("Game score must meet the below criteria : \n\nMust be a number\nGame Score  > 0\nGame Score < or = 2500\n\nCurrent Score = 100\nYou can change this value, find below.");
        return 100;
    } else if (currentPlayerScore > 0 ) {
        return currentPlayerScore
    } else {
        return 100;
    }
}

function rollDice() {
    var dice = [0,0];
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;
    return dice;
}

/*
TODO if new final score text box has value > 0,
  then when new game button is press to ask to keep same score, change score or to return to 100
*/