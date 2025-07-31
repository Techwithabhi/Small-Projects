let player = 'A';
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attemptsA = 0, attemptsB = 0;
let guessedNumbersA = new Set();
let guessedNumbersB = new Set();
let timer;
let timeLeft = 20;
let timerRunning = false;

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    timeLeft = 10;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerRunning = false;
            makeGuess(true);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerRunning = false;
}

document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (!timerRunning) startTimer();
    if (event.key === "Enter") {
        makeGuess();
    }
});

function makeGuess(auto = false) {
    let guessInput = document.getElementById('guessInput');
    let guess = auto ? -1 : parseInt(guessInput.value);
    let result = document.getElementById('result');
    let currentGuessedNumbers = player === 'A' ? guessedNumbersA : guessedNumbersB;
    
    if (!auto && (isNaN(guess) || guess < 1 || guess > 100)) {
        result.innerText = "⚠️ Enter a valid number between 1 and 100!";
        return;
    }

    if (currentGuessedNumbers.has(guess)) {
        result.innerText = "❌ You already guessed that number! Try a different one.";
        return;
    }

    stopTimer();
    currentGuessedNumbers.add(guess);
    
    if (player === 'A') {
        attemptsA++;
        if (guess > targetNumber) {
            result.innerText = "⬇️ Lower number please!";
            startTimer();
        } else if (guess < targetNumber) {
            result.innerText = "⬆️ Higher number please!";
            startTimer();
        } else {
            result.innerText = `🎉 Player A guessed correctly in ${attemptsA} attempts!`;
            player = 'B';
            targetNumber = Math.floor(Math.random() * 100) + 1;
            document.getElementById('message').innerText = "Player B, your turn!";
        }
    } else {
        attemptsB++;
        if (guess > targetNumber) {
            result.innerText = "⬇️ Lower number please!";
            startTimer();
        } else if (guess < targetNumber) {
            result.innerText = "⬆️ Higher number please!";
            startTimer();
        } else {
            result.innerText = `🎉 Player B guessed correctly in ${attemptsB} attempts!`;
            announceWinner();
        }
    }
}

function announceWinner() {
    let message = document.getElementById('message');
    let winner;
    if (attemptsA < attemptsB) {
        winner = "Player A wins the game! 🎉";
    } else if (attemptsB < attemptsA) {
        winner = "Player B wins the game! 🎉";
    } else {
        winner = "It's a Draw! Play again to determine the real winner 💯";
    }
    setTimeout(() => {
        alert(`🎊 CONGRATULATIONS! 🎊\n${winner}`);
    }, 500);
}