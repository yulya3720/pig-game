'use strict';

var scores, roundScore, activePlayer, gamePlaying;
var winningScore = 100;

init();

var diceDOM = document.querySelector('.dice');
var previousDice;
document.querySelector('.btn--roll').addEventListener('click', function(){
  if(gamePlaying){
    
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //update the round score if the rolled number was not 1
    if(dice !== 1){
      if(previousDice == 6 && dice == 6){
        //delete entire score and give turn to next player
        roundScore = 0;
        scores[activePlayer] = 0;
        document.getElementById('score--' + activePlayer).textContent = 0;
        document.getElementById('current--' + activePlayer).textContent = 0;
        nextPlayer();
      } else {
        //add score
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        previousDice = dice;
      }
    } else {
      //next player
      nextPlayer();
    }
``}
});            


document.querySelector('.btn--hold').addEventListener('click', function(){
  if(gamePlaying){
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    //check if the player won the game
    var input = document.querySelector(".score-input").value;
    if(input){
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if(scores[activePlayer] >= winningScore){
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
  });

document.querySelector('.btn--new').addEventListener('click', init);

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  diceDOM.style.display = 'none';
  previousDice = 0;
}

function init(){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  
  //document.querySelector('.dice').style.display = 'none';
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--' + activePlayer).classList.add('player--active');
}