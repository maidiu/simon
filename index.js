
const buttons = document.querySelectorAll('button');
const audioPlayer = document.getElementById('audio-player');
const banner = document.getElementById('banner')
const win1 = document.getElementById('win1')
const win2 = document.getElementById('win2')
const win3 = document.getElementById('win3')
  


  let gameSoFar = [];
  let thisRound = [];
  let roundNumber = 0;
  function roundUpdater() {
        banner.innerText = `Round ${roundNumber}`
        thisRound = [];
  }

document.addEventListener('keydown', () => {
    if (roundNumber == 0) {
    roundNumber++;
    roundUpdater();
    setTimeout(newRound(), 3000)
    } else { return }
})

 let gameStarted = false;
 let result;
 let winCount = 1;

//function runGame() {
    function fail() {
        const fail = banner.getAttribute('data-audio')
        playAudio(fail)
        banner.innerText = `made it to round ${roundNumber}! press any key to play again`
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
        const buttons = document.querySelectorAll('button')
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


        
        /*buttons.forEach(button => {
            button.addEventListener('click', (event)=> {
                let butt = event.target;
                const dataNumber = Number(butt.getAttribute('data-number'))
                if (thisRound.length < (gameSoFar.length - 1)) {
                    thisRound.push(dataNumber)
                    console.log(`you chose: ${dataNumber}`)
                    console.log(`this round so far: ${thisRound}`)
                    for (let i = 0; i < thisRound.length; i++) {
                        if (!thisRound[i] == gameSoFar[i]) {
                            fail();
                            console.log('failed')
                        } else { 
                            const sound = button.getAttribute('data-audio')
                            playAudio(sound)
                            console.log(`number ${thisRound[i]} out of ${gameSoFar.length} logged`)
                        }} 
                } else if (thisRound.length == (gameSoFar.length - 1)) {
                    thisRound.push(dataNumber)
                    for (let i = 0; i < thisRound.length; i++) {
                        if (!thisRound[i] == gameSoFar[i]) {
                            console.log(` failed at number ${thisRound[i]} out of ${gameSoFar.length}`)
                            fail();
                        } else { 
                            console.log(`you chose: ${dataNumber}`)
                            console.log(`this round's numbers': ${thisRound}`)
                            console.log('you won this round')
                            roundNumber++;
                            roundUpdater();
                            setTimeout(newRound(), 1000) 
                        }}
                }
            })
        })*/

    
