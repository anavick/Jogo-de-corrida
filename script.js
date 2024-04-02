let resultDisplayed = false;
const cars = Array.from(document.querySelectorAll('.car'));
const bets = new Map();

function startRace() {
    placeBets();

    cars.forEach(car => {
        const randomDuration = Math.floor(Math.random() * 9) + 5;
        car.style.transitionDuration = `${randomDuration}s`;
        car.style.left = 'calc(100% - 50px)';
    });

    resultDisplayed = false;

    cars.forEach(car => {
        car.addEventListener('transitionend', function handleTransitionEnd() {
            if (!resultDisplayed) {
                const winner = this.id.replace('car', '');
                displayWinner(winner);
                resultDisplayed = true;
                checkWinner(winner);
            }
        });
    });
}

function restartRace() {
    cars.forEach(car => {
        car.style.transitionDuration = '0s';
        car.style.left = '0';
    });

    document.getElementById('result').style.display = 'none';
    resultDisplayed = false;
}

function placeBets() {
    let betAmount;
    let selectedCar;

    do {
        betAmount = parseFloat(prompt(`Quanto você quer apostar? (Saldo disponível: $${document.getElementById('balance').innerText})`));
    } while (isNaN(betAmount) || betAmount <= 0 || betAmount > parseFloat(document.getElementById('balance').innerText));

    const currentBalance = parseFloat(document.getElementById('balance').innerText);
    document.getElementById('balance').innerText = (currentBalance - betAmount).toFixed(2);

    do {
        selectedCar = parseInt(prompt('Em qual carro você quer apostar? (Digite o número do carro)'));
    } while (isNaN(selectedCar) || selectedCar < 1 || selectedCar > 3);

    bets.set(selectedCar, betAmount);
}

function checkWinner(winner) {""
    const currentBet = bets.get(winner);

    if (currentBet !== undefined) {
        const currentBalance = parseFloat(document.getElementById('balance').innerText);
        document.getElementById('balance').innerText = (currentBalance + currentBet * 2).toFixed(2);
    }
}

function displayWinner(winner) {
    const resultElement = document.getElementById('result');
    resultElement.innerText = `O carro ${winner} ganhou!`;
    resultElement.style.display = 'block';
}
