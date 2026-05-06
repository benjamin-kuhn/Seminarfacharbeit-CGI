// ── QUIZ LOGIC ──
const questions = [
  {
    q: `Was bezeichnet der Begriff „CGI" in der Filmproduktion?`,
    options: [`Chromatic Grading Interface`, `Computer Generated Imagery`, `Cinematic Graphics Integration`, `Camera Guided Imaging`],
    correct: 1,
    feedback: `Richtig! CGI steht für Computer Generated Imagery – computergenerierte Bilder, die in Film und digitalen Medien eingesetzt werden, um Szenen zu erzeugen, die mit herkömmlichen Mitteln schwer realisierbar wären.`
  },
  {
    q: `Welches Phänomen beschreibt die unbewusste Ablehnung, wenn digitale Darstellungen zwar fast realistisch, aber nicht ganz überzeugend wirken?`,
    options: [`Digital Fatigue`, `Render Glitch`, `Uncanny Valley`, `Motion Sickness`],
    correct: 2,
    feedback: `Korrekt! Das Uncanny Valley beschreibt den Effekt: Je näher eine digitale Darstellung dem Realen kommt, desto stärker reagieren wir auf minimale Unstimmigkeiten – besonders bei Gesichtern.`
  },
  {
    q: `Welcher Regisseur ließ für „Oppenheimer" (2023) laut eigener Aussage kein einziges reines CGI-Shot verwenden?`,
    options: [`Denis Villeneuve`, `James Cameron`, `Christopher Nolan`, `Ridley Scott`],
    correct: 2,
    feedback: `Richtig! Christopher Nolan ist bekannt für seine Präferenz praktischer Effekte. Für Oppenheimer verzichtete er komplett auf CGI-Shots und ließ die Atomexplosion physisch realisieren.`
  },
  {
    q: `Was versteht man unter der „Fix it in post"-Mentalität?`,
    options: [
      `Alle Fehler werden direkt am Filmset sofort korrigiert`,
      `Kreative Entscheidungen werden auf die Postproduktion verschoben`,
      `Schauspieler verbessern ihre Performance nach dem Dreh`,
      `Drehbuchfehler werden vor dem Dreh behoben`
    ],
    correct: 1,
    feedback: `Genau! Die „Fix it in post"-Mentalität beschreibt, wie Greenscreen-Einsatz dazu verleitet, grundlegende kreative Entscheidungen (Beleuchtung, Set-Design, Komposition) auf die Postproduktion zu verschieben – was VFX-Studios unter enormen Zeitdruck setzt.`
  },
  {
    q: `Welche Filmreihe gilt als positives Gegenbeispiel für qualitativ hochwertiges CGI, bei dem der Regisseur die Kinostart-Termine bewusst verschob?`,
    options: [`Fast & Furious`, `Marvel Cinematic Universe`, `Avatar`, `Transformers`],
    correct: 2,
    feedback: `Richtig! James Cameron verschob die Avatar-Filme mehrfach, um VFX-Studios wie Wētā FX die nötige Zeit für neue Rendering-Verfahren zu geben. Das Ergebnis: Oscars für beste visuelle Effekte.`
  },
  {
    q: `Was ist der Hauptunterschied zwischen Animatronics und CGI?`,
    options: [
      `Animatronics sind billiger in der Herstellung`,
      `Animatronics sind physisch vorhandene, mechanisch gesteuerte Figuren vor der Kamera`,
      `CGI kann keine Kreaturen darstellen`,
      `Animatronics werden nur für Animationsfilme genutzt`
    ],
    correct: 1,
    feedback: `Korrekt! Animatronics sind mechanisch gesteuerte Figuren mit Servomotoren und Hydrauliksystemen – physisch real vor der Kamera. Jurassic Park (1993) zeigte mit tonnenschweren T-Rex-Modellen, wie wirkungsvoll diese Technik sein kann.`
  }
];

let current = 0;
let score = 0;
let answered = false;

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  document.getElementById('quiz-end').classList.remove('show');
  document.getElementById('quiz-main').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById('quiz-progress').textContent = `Frage ${current + 1} / ${questions.length}`;
  document.getElementById('quiz-q').textContent = q.q;

  const opts = document.getElementById('quiz-opts');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = opt;
    btn.onclick = () => answer(i, btn);
    opts.appendChild(btn);
  });

  const fb = document.getElementById('quiz-fb');
  fb.className = 'quiz-feedback';
  fb.textContent = '';

  const nb = document.getElementById('quiz-next-btn');
  nb.className = 'quiz-next';
  nb.textContent = current < questions.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen →';
  answered = false;
}

function answer(i, btn) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const btns = document.querySelectorAll('.quiz-btn');
  btns.forEach(b => b.disabled = true);

  const fb = document.getElementById('quiz-fb');
  if (i === q.correct) {
    score++;
    btn.classList.add('correct');
    fb.className = 'quiz-feedback correct-fb show';
  } else {
    btn.classList.add('wrong');
    btns[q.correct].classList.add('correct');
    fb.className = 'quiz-feedback wrong-fb show';
  }
  fb.textContent = q.feedback;
  document.getElementById('quiz-next-btn').classList.add('show');
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    document.getElementById('quiz-main').style.display = 'none';
    const end = document.getElementById('quiz-end');
    end.classList.add('show');
    document.getElementById('quiz-score-val').textContent = `${score}/${questions.length}`;
    const pct = score / questions.length;
    let label = '';
    if (pct === 1) label = 'Perfekt!';
    else if (pct >= 0.7) label = 'Sehr gut! Solides Wissen über CGI und Filmproduktion.';
    else if (pct >= 0.5) label = 'Nicht schlecht! Lies gerne nochmal in der Facharbeit nach.';
    else label = 'Noch etwas Übungsbedarf – aber jetzt weißt du, wo du nachschauen kannst!';
    document.getElementById('quiz-score-label').textContent = label;
  } else {
    renderQuestion();
  }
}

// Quiz sofort initialisieren
startQuiz();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => observer.observe(r));

sections.forEach(section => observer.observe(section));

const setFavicon = () => {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        document.head.appendChild(link);
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    link.href = isDark ? 'favicon-dark.png' : 'favicon-light.png';
};

setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);


