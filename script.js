const name = "Maman";
const music = document.getElementById("bg-music");
let musicStarted = false;

const content = [
  { type: "text", value: "Tu sais…" },
  { type: "text", value: "Comme ce message n'est pas papier, il restera dans ton coeur pour le restant de tes jours 💖" },
  { type: "text", value: "Genre pas dans les méandres du placard 🕺." },
  { type: "text", value: "Je ne suis pas toujours très fort pour dire les choses clairement." },
  { type: "text", value: "Alors j'y vas" },

  { type: "text", value: "Merci." },
  { type: "text", value: "Vraiment." },

  { type: "text", value: "Merci pour tout ce que tu fais." },
  { type: "text", value: "Même pour ce que je ne remarque pas toujours." },
  { type: "text", value: "Même pour les choses silencieuses." },
  { type: "text", value: "Celles que tu fais sans jamais rien attendre en retour." },

  { type: "text", value: "Merci d'être toujours là." },
  { type: "text", value: "Pas seulement quand tout va bien." },
  { type: "text", value: "Mais aussi quand je doute." },
  { type: "text", value: "Quand je râle pour rien." },
  { type: "text", value: "Quoique je râle pas trop en fait." },

  { type: "text", value: "Merci de me comprendre." },
  { type: "text", value: "Même quand je ne trouve pas les bons mots." },
  { type: "text", value: "Même quand je fais des blagues nulles." },
  { type: "text", value: "Oui… je parle bien de celles-là." },

  { type: "image", value: "./PHOTO.jpg" },

  { type: "text", value: "Merci pour ta patience." },
  { type: "text", value: "La vraie." },
  { type: "text", value: "Celle qui reste, même quand c'est compliqué." },
  { type: "text", value: "Même quand ma chambre ressemble à une zone sinistrée." },
  { type: "text", value: "(promis, je fais des efforts… parfois)" },
  { type: "text", value: "(vraiment)" },

  { type: "text", value: "Merci pour ton soutien." },
  { type: "text", value: "Pour m'encourager sans jamais me forcer." },
  { type: "text", value: "Pour croire en moi, parfois plus que moi-même." },

  { type: "text", value: "Merci pour ton amour inconditionnel." },
  { type: "text", value: "Celui qui ne dépend de rien." },
  { type: "text", value: "Ni des réussites." },
  { type: "text", value: "Ni des erreurs." },
  { type: "text", value: "Ni des moments de doute." },

  { type: "text", value: "Tu m'as appris énormément de choses." },
  { type: "text", value: "Pas avec de grands discours." },
  { type: "text", value: "Mais simplement par ta façon d'être." },

  { type: "text", value: "Même si je ne le dis pas souvent." },
  { type: "text", value: "Même si ça parait normal," },
  { type: "text", value: "Ben tout ça compte énormément pour moi." },

  { type: "text", value: "Ce message n'est peut-être pas parfait (Si)." },
  { type: "text", value: "Mais il est sincère." },

  { type: "text", value: `Merci ${name} ❤️` },
  { type: "text", value: "Pour tout ce que tu es." },
  { type: "text", value: "Pour tout ce que tu fais." },
  { type: "text", value: "Et pour tout ce que tu m'as transmis." }
];

// Update title
document.getElementById("title").textContent = `Joyeux anniversaire ${name} ❤️`;

const btn = document.getElementById("btn");
const messageDiv = document.getElementById("message");

let index = 0;

// Function to create heart explosion effect
function createHeartExplosion(x, y) {
  const heartCount = 15;
  const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝'];

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Starting position (center of button)
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    // Random variation for each heart
    const angle = (Math.PI * 2 * i) / heartCount; // Circular distribution
    const velocity = 100 + Math.random() * 100; // Variable speed
    const offsetX = Math.cos(angle) * velocity;
    const offsetY = Math.sin(angle) * velocity;

    heart.style.setProperty('--offset-x', offsetX + 'px');
    heart.style.setProperty('--offset-y', offsetY + 'px');

    // Random animation selection
    const animations = ['heartFloat', 'heartFloat2', 'heartFloat3'];
    heart.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} ${1.5 + Math.random()}s ease-out forwards`;

    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 2500);
  }
}

// Main button click handler
btn.addEventListener("click", () => {

  // 🎵 démarre la musique au 2e clic
  if (!musicStarted && index >= 1) {
    startMusic();
  }

  if (index >= content.length) {
    const rect = btn.getBoundingClientRect();
    createHeartExplosion(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
    return;
  }

  messageDiv.innerHTML = "";

  const item = content[index];

  if (item.type === "text") {
    const p = document.createElement("p");
    p.textContent = item.value;
    messageDiv.appendChild(p);
  }

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.value;
    img.alt = "Souvenir";
    img.classList.add("souvenir-img");

    if (item.size === "small") img.style.maxWidth = "200px";
    if (item.size === "large") img.style.maxWidth = "400px";

    messageDiv.appendChild(img);
  }

  messageDiv.classList.remove("hidden");
  index++;

  if (index >= content.length) {
    btn.textContent = "❤️";
  }
});


// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    btn.click();
  }
});

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);
function startMusic() {
  if (musicStarted) return;

  musicStarted = true;
  music.loop = true;
  music.volume = 0;

  music.play().then(() => {
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      music.volume = Math.min(v, 0.25);
      if (v >= 0.25) clearInterval(fade);
    }, 100);
  }).catch(err => {
    console.warn("Audio bloqué par le navigateur", err);
  });
}
music.addEventListener("ended", () => {
  console.log("ENDED → devrait pas arriver");
});
