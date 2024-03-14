function play() {
    var bet = parseInt(document.getElementById("bet").value);
    var choice = document.getElementById("choice").value;
    var resultElem = document.getElementById("result");

    if (bet <= 0) {
        resultElem.textContent = "Введите ставку больше 0.";
        return;
    }

    var random = Math.random();
    var result = random < 0.5 ? "heads" : "tails";

    if (result === choice) {
        resultElem.textContent = "Вы угадали! Вы выиграли " + bet + "!";
    } else {
        resultElem.textContent = "Вы проиграли. Попробуйте снова.";
    }
}
