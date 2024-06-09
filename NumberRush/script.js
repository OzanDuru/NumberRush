
let numbers = [];
let table = document.getElementById("dask");
let gridSize = 4; // Varsayılan ızgara boyutu
const difficultySelect = document.getElementById('difficulty');
const gridSizeSelect = document.getElementById('gridSize');
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

let count = 1;
let gameOver = false;
let gameWon = false;
let score = 0;
let timer;


const difficultySettings = {
    easy: 30,
    medium: 20,
    hard: 10
};


let timeLeft = difficultySettings[difficultySelect.value];

difficultySelect.addEventListener('change', function () {
    timeLeft = difficultySettings[difficultySelect.value];
    if (!gameOver && !gameWon) {
        timerElement.innerText = "Time Left: " + timeLeft;
    }
});

gridSizeSelect.addEventListener('change', function () {
    gridSize = parseInt(gridSizeSelect.value);
    resetGame();
});


resetGame();

function resetGame() {
    clearInterval(timer);
    gameOver = false;
    gameWon = false;
    count = 1;
    score = 0;
    scoreElement.innerText = "Score: " + score;
    numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
    shuffle(numbers);
    createTable(gridSize);
    startTimer();
}


function createTable(size) {
    table.innerHTML = ''; // Mevcut tabloyu temizle
    for (let i = 0; i < size; i++) {
        let row = table.insertRow(i);
        for (let j = 0; j < size; j++) {
            let cell = row.insertCell(j);
            cell.addEventListener("click", checkCell);
        }
    }
    fillTable(numbers, size);
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function fillTable(array, size) {
    let index = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            table.rows[i].cells[j].textContent = array[index];
            index++;
        }
    }
}


let correctSound = document.getElementById("correctSound");
let wrongSound = document.getElementById("wrongSound");


function checkCell() {
    if (gameOver || gameWon) return;  // Oyunu bitirince tıklamaları durdurun

    let number = parseInt(this.textContent);
    if (number === count) {
        this.style.animation = "blinkCorrect 0.5s";
        correctSound.play();
        count++;
        score += 10;  // Puan ekle
        scoreElement.innerText = "Score: " + score;

        if (count === (gridSize * gridSize) + 1) {
            gameWon = true;
            clearInterval(timer);  // Zamanlayıcıyı durdur
            setTimeout(() => alert("PERFECT, You are amazing !!!"), 1);
        }
    } else {
        this.style.animation = "blinkWrong 0.5s";
        wrongSound.play();
        gameOver = true;
        setTimeout(() => {
            alert("TRY AGAIN :)");
            location.reload();
        }, 1);
    }
}


function startTimer() {
    timerElement.innerText = "Time Left: " + timeLeft;
    timer = setInterval(() => {
        if (!gameOver && !gameWon) {  // Oyunun kazanılıp kazanılmadığını kontrol edin
            timeLeft--;
            timerElement.innerText = "Time Left: " + timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                if (!gameWon) {  // Oyunun kazanılmadığını kontrol edin
                    gameOver = true;
                    setTimeout(() => {
                        alert("You lose, try again :)");
                        location.reload();
                    }, 1);
                }
            }
        }
    }, 1000);
}


document.getElementById("restartButton").addEventListener("click", resetGame);
