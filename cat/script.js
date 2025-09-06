// Add floating cats
const CAT_COUNT = 14;
for (let i = 0; i < CAT_COUNT; i++) {
  const span = document.createElement("span");
  span.className = "floating-cat";
  span.textContent = "😺";
  span.style.left = Math.random() * 100 + "%";
  span.style.top = Math.random() * 100 + "%";
  span.style.animationDelay = (Math.random() * 8) + "s";
  span.style.fontSize = (12 + Math.random() * 36) + "px";
  document.body.appendChild(span);
}

// Setup audio
let audio;
try {
  audio = new Audio("assets/voices/voice.mp3"); // your voice
} catch (e) {
  console.warn("Voice file missing, using fallback sound.");
}

// Fallback meow if voice not found
function playFallbackMeow() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(660, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.5, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 1);
}

// Click event for red square
document.getElementById("redSquare").addEventListener("click", () => {
  if (audio) {
    audio.play().catch(() => playFallbackMeow());
  } else {
    playFallbackMeow();
  }
});

