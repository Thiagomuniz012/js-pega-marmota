const state = {
  view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      modal: document.querySelector("#modal"),
      pontuacaoModal: document.querySelector("#pontuation-modal"),
      reiniciar: document.querySelector("#reset"),
      startButton: document.querySelector("#startButton"),
      initialText: document.querySelector("#initial-text"),
  },
  values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 2,
  },
  actions: {
      timerId: null,
      countDownTimerId: null,
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      state.view.modal.style.display = "flex";
      state.view.pontuacaoModal.textContent = "Very good, your score was: " + state.values.result;
      state.view.initialText.textContent = "The time is over!"
  }
}

  function newGame() {
    state.values.result = 0;
    state.values.curretTime = 2;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
  
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
  
    state.view.modal.style.display = "none";

    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
  
  function initialize() {
    state.view.modal.style.display = "flex";
    state.view.initialText.textContent = "Welcome!"
    state.view.pontuacaoModal.textContent = "Click on the groundhog and score points."
    addListenerHitBox();
  }
  
  initialize();