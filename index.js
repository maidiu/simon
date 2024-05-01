const gameButtons = document.getElementsByClassName('game-button')
const buttons = [...gameButtons]
const audioPlayer = document.getElementById('audio-player');
const banner = document.getElementById('banner')
const bannerContainer = document.querySelector('.banner-container')
const win1 = document.getElementById('win1')
const win2 = document.getElementById('win2')
const win3 = document.getElementById('win3')
const start = document.getElementById('start')
const play = document.getElementById('play')
const gameOverBanner = document.getElementById('game-over-banner')
const gameEndScreen = document.querySelector('.high-scores-container')

  let gameSoFar = [];
  let thisRound = [];
  let roundNumber = 0;
  function roundUpdater() {
        banner.innerHTML = `Round <span style='color: orange;'>${roundNumber}</span>`
        thisRound = [];
  }

start.addEventListener('click', startUp)
play.addEventListener('click', () => {
    gameEndScreen.style.display = 'none';
    document.body.style.background = 'blueviolet';
    startUp();
})

function startUp() {
    start.style.display = 'none'
    banner.style.display = 'initial'
    roundNumber++;
    roundUpdater();
    newScore = 0;
    setTimeout(newRound, 1000)
}

 let gameStarted = false;
 let result;
 let winCount = 1;
 let newScore = 0;

//function runGame() {
    function gameOver() {
        gameEndScreen.style.display = 'flex'
        const gameOver = gameOverBanner.getAttribute('data-audio')
        playAudio(gameOver)
        //gameOverBanner.innerHTML = `made it to round <span style='color:orange;'>${roundNumber}</span>!`
        loadHighScores();
        
        newScore = (roundNumber - 1) * 1000;
        addHighScore(newScore);
        
        
        console.log(newScore)
        gameOverBanner.innerHTML = `you scored <span style='color:orange;'>${newScore}</span>!`
        gameSoFar = [];
        thisRound = [];
        roundNumber = 0;
        winCount = 1;
        gameStarted = false;
    }

    function playAudio(sound) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = sound;
        audioPlayer.play();
    }

    function newRound() {
        const gameButtons = document.getElementsByClassName('game-button')
        const buttons = [...gameButtons]
        result = Math.floor(Math.random() * 4)
        gameSoFar.push(result)
        console.log(`this round's addition: ${result}`)
        console.log(`gameSoFar: ${gameSoFar}`)
        
        let buttonInQuestion = document.querySelector(`[data-number='${result}']`)
        buttonInQuestion.classList.add('signal')
        const audio = buttonInQuestion.getAttribute('data-audio')
        playAudio(audio);
        
        setTimeout(() => buttonInQuestion.classList.remove('signal'), 200)
        gameStarted = true;
    }
buttons.forEach(load)
    
function load(button) {
    button.addEventListener('click', (event) => {
        let butt = event.target;
        const dataNumber = Number(butt.getAttribute('data-number'))
        thisRound.push(dataNumber)
        let placement = (thisRound.length - 1)
        if (thisRound[placement] !== gameSoFar[placement]) {
            console.log(`failed at number ${thisRound.length} out of ${gameSoFar.length}`)
            gameOver();
        } else if ((thisRound[placement] == gameSoFar[placement]) && (gameSoFar.length > thisRound.length)) {
            const sound = button.getAttribute('data-audio')  
            playAudio(sound)
            console.log(`${thisRound.length} out of ${gameSoFar.length} -- keep on`)
        } else if ((thisRound[placement] == gameSoFar[placement]) && (gameSoFar.length == thisRound.length)) {
            console.log('you won this round')
            const sound = button.getAttribute('data-audio')                
            playAudio(sound)
    
            function reset() {
                roundNumber++;
                roundUpdater();
                newRound();
            }

            setTimeout(reset, 700)                
        }
    })}









const HIGH_SCORES_KEY = 'highScores';
let highScores = [];

// Load high scores from local storage
function loadHighScores() {
  const storedHighScores = localStorage.getItem(HIGH_SCORES_KEY);
  if (storedHighScores) {
    highScores = JSON.parse(storedHighScores);
  }
}

// Save high scores to local storage
function saveHighScores() {
  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
}

// Display high scores on the webpage
function displayHighScores() {
  const highScoresList = document.querySelector('.high-scores-list');
  let output = highScores.map((score, index) => {
    const number = index + 1;
    return `<ul>${number}. ${score.score} - ${score.date}</ul>`}).join('');
    highScoresList.innerHTML = `<h2>high scores</h2> ${output}`
}

// Add a new high score
function addHighScore(newScore) {
  const now = dateFns.format(new Date(), 'yyyy-MM-dd') // Get current date and time
  highScores.push({ score: newScore, date: now });
  highScores.sort((a, b) => b.score - a.score); // Sort high scores in descending order
  highScores = highScores.slice(0, 10); // Keep only the top 10 high scores
  saveHighScores();
  displayHighScores();
}

// Example usage
 // Add a new high score
