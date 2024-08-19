const startWords = [
  "사과",
  "강물",
  "열매",
  "바다",
  "나무",
  "물고기",
  "돌멩이",
  "가방",
  "고양이",
  "강아지",
];
const $startBtn = document.getElementById("startBtn");
const $submitBtn = document.getElementById("submitBtn");
const $gameScreen = document.querySelector(".gameScreen");
const $readyScreen = document.querySelector(".readyScreen");
const $timerBar = document.querySelector(".timerBar");
const $innerBar = document.querySelector(".innerBar");
const $guide = document.querySelector(".guide");
const $life = document.querySelector(".life");

const $currentWord = document.getElementById("currentWord");
const randomWord = startWords[Math.floor(Math.random() * startWords.length)]; // 시작 단어중 랜덤하게 한 단어를 선택
$currentWord.textContent = `현재 단어: ${randomWord}`;

const $currentScore = document.getElementById("currentScore");
const $scoreValue = document.getElementById("scoreValue");
const $highestScore = document.getElementById("highestScore");
const $earnedScore = document.getElementById("earnedScore");

const $hearts = document.querySelectorAll(".life img");
const $count = document.querySelector(".count");
const $clockIcon = document.querySelector(".fa-clock");

const $modal = document.getElementById("modal");
const $hideBtn = document.getElementById("hideBtn");
const $modalBtn = document.getElementById("modalBtn");

const $success = document.getElementById("success");
const $fail = document.getElementById("fail");

const $endingMessage = document.getElementById("endingMessage");
const $playAgainBtn = document.getElementById("playAgainBtn");

const $modalError = document.getElementById("modalError");

let timer; // 기존에 실행중인 타이머가 있었는지 체크해주는 변수
let timeLeft;
let isGameOver = false;
const usedWords = new Set(); // 이번 게임에서 사용된 단어를 담을 배열

$hideBtn.addEventListener("click", () => {
  $modal.classList.remove("show");
});

const $inputBox = document.getElementById("inputBox");

$inputBox.addEventListener("input", (event) => {
  const koreanRegex = /^[ㄱ-ㅎ가-힣]*$/; // 한글만 입력할 수 있도록 제한

  if (!koreanRegex.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^ㄱ-ㅎ가-힣]/g, "");
  }
});

const saveScore = (score) => {
  console.log(score);
  if (localStorage.getItem("myScore")) {
    const prevScore = localStorage.getItem("myScore");
    localStorage.setItem("myScore", Math.max(score, prevScore));
  } else {
    localStorage.setItem("myScore", Number(score));
  }
};

const gameOver = () => {
  if (isGameOver) return;

  isGameOver = true;
  const currentScore = Number($scoreValue.textContent);
  const prevScore = Number(localStorage.getItem("myScore")) || 0;

  if (currentScore > prevScore) {
    $endingMessage.textContent = "신기록 갱신!";
    localStorage.setItem("myScore", currentScore);
  } else {
    $endingMessage.textContent = "기록 유지";
  }

  $highestScore.textContent = `${Math.max(currentScore, prevScore)}`;
  $earnedScore.textContent = `${currentScore}`;

  $clockIcon.classList.remove("shake");
  $modal.classList.add("show");
  console.log("게임이 종료되었습니다");
};

const ticTok = () => {
  // 시계 째깍째깍 애니메이션
  $count.style.color = "red";
  $clockIcon.classList.add("shake");
};
/** 타이머에 대한 함수 */
const triggerTimer = () => {
  if (timer) {
    clearInterval(timer);
  }

  $innerBar.style.width = "100%";
  let $second = document.getElementById("second");
  timeLeft = 10;
  $second.textContent = timeLeft;

  timer = setInterval(() => {
    if (isGameOver) {
      // 게임이 종료되었으면 타이머를 멈춤
      clearInterval(timer);
      $innerBar.style.transition = "none";
      $innerBar.style.width = `${0}%`;
      return;
    }

    timeLeft--; // 1초씩 감소
    $second.textContent = `${timeLeft}`;

    if (timeLeft <= 4 && !$clockIcon.classList.contains("shake")) {
      ticTok(); // 4초 이하일 때 시계 흔들리는 애니메이션 적용
    } else if (timeLeft > 4 && $clockIcon.classList.contains("shake")) {
      // 4초 이상일 때 애니메이션 멈춤
      $clockIcon.classList.remove("shake");
      $count.style.color = "";
    }
    $innerBar.style.width = `${(timeLeft / 10) * 100}%`;

    if (timeLeft === 0) {
      clearInterval(timer); // 타이머 멈춤
      gameOver(); // 타이머가 0이 되면 게임 종료
    }
  }, 1000);
};

const startGame = () => {
  $readyScreen.style.display = "none";
  $gameScreen.style.display = "flex";
  $life.style.display = "block";
  $currentScore.style.display = "block";
  $timerBar.style.display = "block";
  $guide.style.display = "block";
  $count.style.display = "block";
  triggerTimer();
};
$startBtn.addEventListener("click", () => {
  startGame();
});

const lastHeart = () => {
  for (let i = $hearts.length - 1; i >= 0; i--) {
    if ($hearts[i].src.endsWith("heart.png")) {
      return i;
    }
  }
  return -1;
};

const handleScore = (input) => {
  if (input === "success") {
    const prevScore = $scoreValue.textContent;
    const newScore = Number(prevScore) + 10;
    $scoreValue.textContent = newScore;
  } else if (input === "fail") {
    const lastHeartIdx = lastHeart();
    if (lastHeartIdx > 0) {
      $hearts[lastHeartIdx].src = "./image/grayHeart.png";
    } else {
      $hearts[0].src = "./image/grayHeart.png";
      gameOver();
    }
  }
};

/** 끝말잇기 규칙 함수 */
const checkWord = (word) => {
  const lastChar = $currentWord.textContent.slice(-1);

  if (usedWords.has(word)) {
    $fail.textContent = "😅 실패 : 이미 사용한 단어입니다!";
    return false;
  }

  if (word.charAt(0) !== lastChar) {
    $fail.textContent = "😅 실패 : 끝말잇기가 성립되지 않습니다!";
    return false;
  }

  return true; // 끝말잇기 규칙이 성립되고, 새로운 단어인 경우
};

const handleSubmit = () => {
  const word = $inputBox.value; // 입력된 단어
  const url = `http://localhost:3000/proxy?word=${word}`; // 프록시 서버 URL로 요청

  // API 요청 보내기
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const result = data.channel.total;
      if (result > 0 && checkWord(word)) {
        handleScore("success");
        usedWords.add(word);
        triggerTimer();
        $fail.style.display = "none";
        $success.style.display = "block";
        $currentWord.textContent = "현재 단어: " + word;
      } else {
        handleScore("fail");
        $success.style.display = "none";
        $fail.style.display = "block";
      }
    })
    .catch((error) => {
      $modalError.classList.add("show");
      console.error(error);
    });
};

$submitBtn.addEventListener("click", () => {
  if ($inputBox.value !== "") {
    handleSubmit();
  }
});
$inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmit();
  }
});

$playAgainBtn.addEventListener("click", () => {
  window.location.reload();
});
