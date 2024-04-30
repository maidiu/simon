
const gameButtons = document.getElementsByClassName('game-button')
const buttons = [...gameButtons]
const audioPlayer = document.getElementById('audio-player');
const banner = document.getElementById('banner')
const win1 = document.getElementById('win1')
const win2 = document.getElementById('win2')
const win3 = document.getElementById('win3')
const start = document.getElementById('start')

  let gameSoFar = [];
  let thisRound = [];
  let roundNumber = 0;
  function roundUpdater() {
        banner.innerText = `Round ${roundNumber}`
        thisRound = [];
  }

start.addEventListener('click', () => {
    if (roundNumber == 0) {
    roundNumber++;
    roundUpdater();
    setTimeout(newRound, 1000)
    } else { return }
})

 let gameStarted = false;
 let result;
 let winCount = 1;

//function runGame() {
    function fail() {
        const fail = banner.getAttribute('data-audio')
        playAudio(fail)
        banner.innerHTML = `made it to round ${roundNumber}! <br><button id="start">play</button>`
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
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let butt = event.target;
        const dataNumber = Number(butt.getAttribute('data-number'))
        thisRound.push(dataNumber)
        let placement = (thisRound.length - 1)
        if (thisRound[placement] !== gameSoFar[placement]) {
            console.log(`failed at number ${thisRound.length} out of ${gameSoFar.length}`)
            fail();
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
    })})