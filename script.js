
/* =====================================================
   USELESS CODE JUDGE — script.js
   Fake evaluation logic (never touches the actual code)
   ===================================================== */

/* =====================================================
   ELEMENT REFERENCES
   ===================================================== */
const codeEditor = document.getElementById("code-editor");
const checkButton = document.getElementById("check-button");

const loadingScreen = document.getElementById("loading-screen");
const loadingMessage = document.getElementById("loading-message");

const resultScreen = document.getElementById("result-screen");
const verdictEl = document.getElementById("verdict");
const scoreEl = document.getElementById("score");
const resultVideo = document.getElementById("result-video");

const tryAgainButton = document.getElementById("try-again");

/* =====================================================
   FAKE DATA
   ===================================================== */
const loadingMessages = [
  "Initializing compiler...",
  "Reading source code...",
  "Analyzing syntax...",
  "Checking algorithm efficiency...",
  "Searching for bugs...",
  "Consulting the senior developer...",
  "Questioning your programming decisions...",
  "Performing unnecessary calculations...",
  "Finalizing completely legitimate results..."
];

const verdicts = [
  "PERFECT",
  "ACCEPTED",
  "ABSOLUTELY TERRIBLE",
  "REJECTED FOR NO REASON",
  "THE COMPUTER IS CONFUSED",
  "GOOD ENOUGH",
  "WHY DID YOU WRITE THIS?",
  "CODE ACCEPTED",
  "I HAVE NO IDEA",
  "SUSPICIOUSLY FUNCTIONAL"
];

const videos = [
  "media/video1.mp4",
  "media/video2.mp4",
  "media/video3.mp4",
  "media/video4.mp4",
  "media/video5.mp4"
];
let currentVideo = 0;

/* =====================================================
   STATE
   ===================================================== */
// Prevents multiple evaluation sequences from running at once
let isEvaluating = false;

// Keeps track of pending timeouts so they can be cleared if needed
let pendingTimeouts = [];

/* =====================================================
   HELPER FUNCTIONS
   ===================================================== */

// Pick a random item from an array
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Generate a random integer between 0 and 100 (inclusive)
function getRandomScore() {
  return Math.floor(Math.random() * 101);
}

// Clear any pending fake-loading timeouts
function clearPendingTimeouts() {
  pendingTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  pendingTimeouts = [];
}

/* =====================================================
   LOADING SEQUENCE
   ===================================================== */

// Cycles through the fake loading messages with staggered delays.
// Total duration lands in the ~4-5 second range before results show.
function runLoadingSequence(onComplete) {
  const delayBetweenMessages = 500; // ms between each message change
  const finalDelayBeforeResults = 800; // extra pause after last message

  loadingMessages.forEach((message, index) => {
    const timeoutId = setTimeout(() => {
      loadingMessage.textContent = message;
    }, index * delayBetweenMessages);
    pendingTimeouts.push(timeoutId);
  });

  const totalDuration =
    loadingMessages.length * delayBetweenMessages + finalDelayBeforeResults;

  const finalTimeoutId = setTimeout(() => {
    onComplete();
  }, totalDuration);
  pendingTimeouts.push(finalTimeoutId);
}

/* =====================================================
   RESULT SEQUENCE
   ===================================================== */

// Fills in the result screen with random verdict/score/video
// Note: user's code is never read, parsed, or evaluated here.
function showResults() {
  // Random verdict text
  verdictEl.textContent = `Verdict: ${getRandomItem(verdicts)}`;

  // Random score, unrelated to the actual code
  scoreEl.textContent = `Code Quality: ${getRandomScore()}%`;

  // Reset video before assigning a new source
  resultVideo.pause();
  resultVideo.removeAttribute("src");
  resultVideo.load();

  const chosenVideo = videos[currentVideo];

currentVideo++;

if (currentVideo >= videos.length) {
    currentVideo = 0;
}

resultVideo.src = chosenVideo;
  resultVideo.load();

  // Attempt autoplay; if blocked, controls remain visible for manual play
  const playPromise = resultVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay was blocked — video stays visible with controls,
      // user can press play manually. No further action needed.
    });
  }

  // Swap screens
  loadingScreen.hidden = true;
  resultScreen.hidden = false;
}

/* =====================================================
   MAIN EVALUATION FLOW
   ===================================================== */

function startEvaluation() {
  // Guard against multiple simultaneous evaluations
  if (isEvaluating) {
    return;
  }
  isEvaluating = true;

  // Disable the button while "processing"
  checkButton.disabled = true;

  // Reset loading message to the initial state
  loadingMessage.textContent = "Initializing compiler...";

  // Hide results, show loading
  resultScreen.hidden = true;
  loadingScreen.hidden = false;

  // Run the fake loading sequence, then reveal results
  runLoadingSequence(() => {
    showResults();
    checkButton.disabled = false;
    isEvaluating = false;
  });
}

/* =====================================================
   RESET / TRY AGAIN FLOW
   ===================================================== */

function resetInterface() {
  // Stop and clear the video
  resultVideo.pause();
  resultVideo.removeAttribute("src");
  resultVideo.load();

  // Hide the result screen, make sure loading is hidden too
  resultScreen.hidden = true;
  loadingScreen.hidden = true;

  // Clear any leftover text
  verdictEl.textContent = "";
  scoreEl.textContent = "";

  // Cancel any stray timeouts and reset state
  clearPendingTimeouts();
  isEvaluating = false;
  checkButton.disabled = false;
}

/* =====================================================
   EVENT LISTENERS
   ===================================================== */

checkButton.addEventListener("click", () => {
  // The contents of codeEditor.value are intentionally never read
  // or evaluated — this is a purely decorative reference point.
  startEvaluation();
});

tryAgainButton.addEventListener("click", () => {
  resetInterface();
});
