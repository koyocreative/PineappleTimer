let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const audio = document.querySelector('#ding');

function timer(seconds) {

    clearInterval(countdown)
    // get current timestamp
    const now = Date.now()
    // turn seconds into miliseconds
    const past = now + seconds * 1000

    displayTimeLeft(seconds)
    displayEndTime(past)

    countdown = setInterval( () => {
        const secLeft = Math.round((past - Date.now()) / 1000)

        // check if we should stop it
        if( secLeft < 0 ) {
            audio.play();
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secLeft)
    }, 1000 )

}


function displayTimeLeft(seconds) {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    const display = `${min}:${sec < 10 ? '0' : ''}${sec}`

    document.title = display
    timerDisplay.textContent = display
}


function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours()
    const correctHour = hour > 12 ? hour - 12 : hour
    const min = end.getMinutes()

    endTime.textContent = `Session will be done at ${correctHour}:${min < 10 ? '0' : ''}${min}`
}

function startTimer() {
    const sec = parseInt(this.dataset.time)
    timer(sec)
}

// Add event listener on buttons
// Start timer on click
buttons.forEach( button => button.addEventListener('click', startTimer) )
