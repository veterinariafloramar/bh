const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;
const totalPairs = 4; // temos 4 pares
const message = document.getElementById('message');

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.character === secondCard.dataset.character;

  if (isMatch) {
    message.textContent = "✅ Acertou!";
    disableCards();
    matchCount++;
    if (matchCount === totalPairs) {
      setTimeout(() => {
        message.textContent = "🎉 Você venceu!";
      }, 500);
    }
  } else {
    message.textContent = "";
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('restartButton').addEventListener('click', () => {
  // Zera tudo
  matchCount = 0;
  message.textContent = '';
  
  // Desvira todas as cartas
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Embaralha de novo
  setTimeout(() => {
    shuffle();
  }, 500);
});

// Refatorar a função shuffle (se ainda não for assim):
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}
