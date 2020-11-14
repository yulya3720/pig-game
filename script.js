'use strict';

var scores, roundScore, activePlayer, gamePlaying;
var winningScore = 100;

init();

var dice1DOM = document.querySelector('#dice-1');
var dice2DOM = document.querySelector('#dice-2');
document.querySelector('.btn--roll').addEventListener('click', function(){
  if(gamePlaying){
    
    //random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(dice1, dice2);
    //display the result
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    //update the round score if the rolled number was not 1
    if(dice1 !== 1 && dice2 !== 1){
      if(dice1 == 6 && dice2 == 6){

        //delete entire score and give turn to next player
        roundScore = 0;
        scores[activePlayer] = 0;
        document.getElementById('score--' + activePlayer).textContent = 0;
        document.getElementById('current--' + activePlayer).textContent = 0;
        nextPlayer();
      } else {

        //add score
        roundScore += dice1 + dice2;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
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
  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';
}

function init(){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
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