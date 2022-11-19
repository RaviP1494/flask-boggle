const guessBtn = document.querySelector('#guess-button');
const scoreDiv = document.querySelector('#score-div');
const confirmDiv = document.querySelector('#confirm-div');
const attemptsDiv = document.querySelector('#attempts-div');
const guessForm = document.querySelector('#guess-form');
const timerDiv = document.querySelector('#timer-div');

const gameTime = 30;
const guesses = new Set();

let timerId;

let score = 0;

async function guessClick(e) {
    e.preventDefault();
    const guess = e.target.parentElement.querySelector('#guess-input').value;
    if(guesses.has(guess)){
        confirmDiv.innerText = `${guess} has been guessed already`;
        return;
    }
    let resp = await axios.get(`/guess/${guess}`);
    if(resp.data == 'ok'){
        score+= guess.length;
        guesses.add(guess);
        confirmDiv.innerText = `${guess} is a word on the board`
    }
    else if(resp.data == 'not-on-board'){
        confirmDiv.innerText = `${guess} is not on the board`
    }
    else if(resp.data == 'not-word'){
        confirmDiv.innerText = `${guess} is not a word`
    }
    scoreDiv.innerText = `Score: ${score}`
}

function setUp(e){
    let i = 0;
    timerId = setInterval(function(){
        timerDiv.innerText = `Time remaining: ${gameTime - i}`;
        i++;
    },1000);
    setTimeout(function(){
        clearInterval(timerId);
        guessForm.remove();
        timerDiv.remove();
        checkScore(score);
    },gameTime * 1000)
}

async function checkScore(s){
    let resp = await axios.post(`/score-check`, {score : s});
    let high_score = resp.data['high_score'];
    let attempt = resp.data['attempts'];
    confirmDiv.innerText = `High score is ${high_score}`;
    attemptsDiv.innerText = `Attempts: ${attempt}`;
}


guessBtn.addEventListener('click', guessClick);
document.addEventListener('DOMContentLoaded', setUp);

