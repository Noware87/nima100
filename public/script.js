
let target = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById("guessInput").value);
    const feedback = document.getElementById("feedback");
    const attemptsText = document.getElementById("attempts");

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = "Skriv ett tal mellan 1 och 100!";
        return;
    }

    attempts++;
    if (guess < target) {
        feedback.textContent = "För lågt!";
    } else if (guess > target) {
        feedback.textContent = "För högt!";
    } else {
        feedback.textContent = `Rätt! Det var ${target}.`;
        document.getElementById("submitScore").style.display = "block";
    }

    attemptsText.textContent = `Försök: ${attempts}`;
}

function submitHighscore() {
    const name = document.getElementById("playerName").value;
    fetch("/api/highscores", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, attempts })
    }).then(res => res.json())
      .then(showHighscores);
}

function showHighscores(scores) {
    const ul = document.getElementById("highscores");
    ul.innerHTML = "";
    scores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.name} – ${score.attempts} försök`;
        ul.appendChild(li);
    });
}

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    music.paused ? music.play() : music.pause();
}

window.onload = () => {
    fetch("/api/highscores")
        .then(res => res.json())
        .then(showHighscores);
};
