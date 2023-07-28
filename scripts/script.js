let play = document.getElementById("play");
let center = document.getElementById("center1");
let choose = document.getElementById("choose1");
let keyboard = document.getElementById("keyboard1");
let button1 = document.getElementById("button1");
let figureJumpingn = document.getElementById("figure-jumping");
let button2 = document.getElementById("button2");
let game = document.getElementById("game1");
let backButton1 = document.getElementById("back1")
let backButton2 = document.getElementById("back2")
let backButton3 = document.getElementById("back3")
let countDown = document.getElementById("count-down")
let h1Id = document.getElementById("start-count")
let word = document.getElementById("word")
let input = document.getElementById("input")
let score = document.getElementById("score")
let highScoreElement = document.getElementById("high-score");
let taymer = document.getElementById("taymer");
let gameOver = document.getElementById("game-over")
let score2 = document.getElementById("score2")
let audio = document.getElementById("audio")
var id2


let oneletter;
let oneElement;
let a = 0;

function gameKeyboard() {
  backButton1.addEventListener("click", function () {
    oneElement.classList.remove("selected");
  })
  oneletter = randItm(letterArr);
  oneElement = document.getElementById(oneletter);
  oneElement.classList.add("selected");

  document.addEventListener("keyup", foo)
}
function foo() {
  audio.play()
  if (event.code === oneletter) {
    oneElement.classList.remove("selected");
    oneletter = randItm(letterArr);
    oneElement = document.getElementById(oneletter);
    oneElement.classList.add("selected");

  } else if (event.code !== oneletter) {
    var falseEl = document.getElementById(event.code);
    falseEl.classList.add("hit");

    setTimeout(function () {
      falseEl.classList.remove("hit");
    }, 200);
  }
}

play.addEventListener("click", function () {
  center.style.display = "none";
  choose.style.display = "block";
});

button1.addEventListener("click", function () {
  choose.style.display = "none";
  figureJumpingn.style.display = "none";
  keyboard.style.display = "block";
  backButton1.style.display = "block";

  gameKeyboard();
});

function generalGame() {
  a = 0
  score.innerHTML = 0
  countDown.style.display = "none";
  game.style.display = "block";
  backButton2.style.display = "block";
  word.innerHTML = randItm(words);
  let localStorageScore = localStorage.getItem('score')
  if (localStorageScore == null) {
    localStorage.setItem('score', 0);
    highScoreElement.innerHTML = 0

  }
  else {
    highScoreElement.innerHTML = localStorageScore
  }
  id2 = setInterval(function () {

    if (+taymer.innerHTML <= 0) {
      clearInterval(id2);

      taymer.innerHTML = 0
      backButton1.style.display = "none";
      game.style.display = "none";
      gameOver.style.display = "block";
      score2.innerHTML = score.innerHTML;

    }
    taymer.innerHTML = taymer.innerHTML - 1;
  }, 1000)


  input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

      if (input.value === word.innerHTML) {

        score.innerHTML = ++a;
        if (score.innerHTML > highScoreElement.innerHTML) {
          localStorage.setItem("score", score.innerHTML);
          highScoreElement.innerHTML = score.innerHTML
        }
        word.innerHTML = randItm(words);
        taymer.innerHTML = +taymer.innerHTML + 3
      } else if (input.value !== word.innerHTML) {
        if (taymer.innerHTML >= 2) {
          taymer.innerHTML = +taymer.innerHTML - 2
        }


      }
      input.value = "";
    }
  });
}





button2.addEventListener("click", function () {
  input.value = ""
  taymer.innerHTML = 10
  h1Id.innerHTML = 3
  countDown.style.display = "block";
  choose.style.display = "none";
  figureJumpingn.style.display = "none";
  let id = setInterval(function () {
    h1Id.innerHTML = h1Id.innerHTML - 1;
    if (h1Id.innerHTML == 0) {
      clearInterval(id);
      generalGame();
    }
  }, 1000);
});


backButton1.addEventListener("click", function () {
  if (keyboard.style.display === "block") {
    document.removeEventListener("keyup", foo);
    keyboard.style.display = "none";
    choose.style.display = "block";
    figureJumpingn.style.display = "block";
    backButton1.style.display = "none";
  }
});

backButton2.addEventListener("click", function () {
  if (game.style.display === "block") {

    game.style.display = "none";
    choose.style.display = "block";
    figureJumpingn.style.display = "block";
    backButton1.style.display = "none";
    clearInterval(id2)
  }
})

backButton3.addEventListener("click", function () {
  if (gameOver.style.display === "block") {

    location.reload();
  }
})

function randItm(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


