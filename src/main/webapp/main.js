// === Volume Toggle Setup ===
document.getElementById("volumeicon").addEventListener("click", volumetoggle);
let isMuted = false;
let player;



// === Hintergrundvideo mit zufälligem Startzeitpunkt ===
function onload() {
  const randomTime = Math.floor(Math.random() * 41574) + 1;
  document.getElementById("ytbackgrplayer").src =
    `https://www.youtube-nocookie.com/embed/_VlrdVwG7sI?start=${randomTime}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&version=3&vq=hd2160&mute=1`;
location.href='#section1'
const f = document.getElementById("ball");
document.addEventListener(
  "click",
  (ev) => {
    f.style.transform = `translateY(${ev.clientY - 25}px)`;
    f.style.transform += `translateX(${ev.clientX - 25}px)`;
  },
  false,
);

}

// === Info-Box schließen und Musik abspielen ===
function closeInfoBox() {
  var body = document.querySelector("html");
  const box = document.getElementById('infobox');
  const bgmusic = document.getElementById('bgmusic');

  if (bgmusic) {
    const src = bgmusic.src;
    const hasQuery = src.includes("?");
    const newSrc = src + (hasQuery ? "&autoplay=1" : "?autoplay=1");
    bgmusic.src = newSrc;
  }

  box.classList.add('fade-out');
  setTimeout(() => {
    box.style.display = 'none';
  }, 500);

    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) { /* Safari */
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { /* IE11 */
      body.msRequestFullscreen();
    }

}

// === Musik an-/ausschalten ===
function volumetoggle() {
  const volumeIcon = document.getElementById('volumeicon');

  if (isMuted) {
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    document.getElementById('music-background').innerHTML =
      '<iframe id="bgmusic" src="https://www.youtube-nocookie.com/embed/UtWaBEn_x8c?enablejsapi=1&loop=1" allow="autoplay" frameborder="0" allowfullscreen></iframe>';

    const bgmusic = document.getElementById('bgmusic');
    if (bgmusic) {
      const src = bgmusic.src;
      const hasQuery = src.includes("?");
      const newSrc = src + (hasQuery ? "&autoplay=1" : "?autoplay=1");
      bgmusic.src = newSrc;
    }
  } else {
    const bgmusic = document.getElementById('bgmusic');
    if (bgmusic) {
      bgmusic.parentNode.removeChild(bgmusic);
    }
    volumeIcon.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
  }

  isMuted = !isMuted;
}

const texts = [
  // Real languages (continuation + rare ones)
  "Welcome to Kiminet",                        // English
  "Bienvenido a Kiminet",                      // Spanish
  "Bienvenue à Kiminet",                       // French
  "Willkommen bei Kiminet",                    // German
  "Benvenuti a Kiminet",                       // Italian
  "ようこそキミネットへ",                          // Japanese
  "Kiminetへようこそ",                             // Japanese alt
  "Kiminet에 오신 것을 환영합니다",                  // Korean
  "مرحبا بك في كيمينيت",                          // Arabic
  "Добро пожаловать в Kiminet",                // Russian
  "欢迎来到Kiminet",                               // Chinese (Simplified)
  "歡迎來到Kiminet",                               // Chinese (Traditional)
  "Bem-vindo ao Kiminet",                      // Portuguese
  "स्वागत है Kiminet में",                        // Hindi
  "ברוך הבא לקימינט",                            // Hebrew
  "Selamat datang di Kiminet",                 // Indonesian
  "Chào mừng đến với Kiminet",                 // Vietnamese
  "Tervetuloa Kiminetiin",                     // Finnish
  "Croeso i Kiminet",                          // Welsh
  "Fáilte go Kiminet",                         // Irish Gaelic
  "Maligayang pagdating sa Kiminet",           // Tagalog
  "Karibu Kiminet",                            // Swahili
  "Kia ora ki Kiminet",                        // Māori
  "Talofa lava i Kiminet",                     // Samoan
  "ለKiminet እንኳን ደህና መጡ",                      // Amharic (Ethiopia)
  "Добре дошли в Kiminet",                     // Bulgarian
  "Ласкаво просимо до Kiminet",                // Ukrainian
  "Kiminet'e hoş geldiniz",                    // Turkish
  "ຍິນດີຕ້ອນຮັບສູ່ Kiminet",                    // Lao
  "សូមស្វាគមន៍មកកាន់ Kiminet",                   // Khmer
  "வணக்கம் Kiminet-இல்",                          // Tamil
  "કિમિનેટમાં આપનું સ્વાગત છે",                     // Gujarati
  "ຍິນດີຕ້ອນຮັບມາຍັງ Kiminet",                   // Lao alt
  "Wamkelekile eKiminet",                      // Xhosa
  "Nnabata na Kiminet",                        // Igbo
  "Kiminet aba wo akye",                       // Akan (Twi)

  // Constructed languages
  "Elen sila lumenn’ omentielvo, Kiminet",     // Elvish (Quenya - Tolkien)
  "nuqneH, Kiminet",                            // Klingon (Star Trek)
  "Athchomar chomakaan Kiminet",               // Dothraki (Game of Thrones)
  "Yol to Kiminet",                             // Valyrian (High Valyrian)
  "Ia! Kiminet ftaghn!",                        // R'lyehian (Lovecraftian, Cthulhu vibes)
  "Toki pona la Kiminet o",                     // Toki Pona
  "Mellon, welcome to Kiminet",                 // Sindarin (Elvish, Tolkien)
  "🫱🫲 Welcome to Kiminet",                      // Meme-handshake
  "🐸☕️ Welcome to Kiminet",                     // Kermit meme
  "UwU~ Welcome tu Kiminyet 💖",                // UwU speak
  "W3lc0m3 2 K!m!n3t",                          // L33t Speak
  "✨🌈 Welcome to Kiminet ✨🌈",                 // Aesthetic sparkles
  "👋👽 Welcome to Kiminet, Earthling",           // Alien speak
  "🤖 01010100 01101111 Kiminet",               // Binary (says "To Kiminet")
  "meow meow welcome to Kiminet 🐾",            // Cat language
];


let currentTextIndex = 0;
let current = 0;
let l = texts[currentTextIndex].length;
const time = 20;
let userTyping = false;

document.getElementById("title").addEventListener("input", function () {
  userTyping = true;
});

const write_text = function () {
  if (userTyping) return;

  const titleElement = document.getElementById("title");
  titleElement.textContent += texts[currentTextIndex][current];

  if (current < l - 1) {
    current++;
    setTimeout(write_text, time);
  } else {
    setTimeout(delete_text, 2500);
  }
};

const delete_text = function () {
  if (userTyping) return;

  const titleElement = document.getElementById("title");
  titleElement.textContent = "";
  currentTextIndex = (currentTextIndex + 1) % texts.length;
  current = 0;
  l = texts[currentTextIndex].length;
  setTimeout(write_text, time);
};

setTimeout(write_text, time);
function clickEffect(e){
	var d=document.createElement("div");
	d.className="clickEffect";
	d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
	document.body.appendChild(d);
	d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}
function clickEffect1 (e) {
	clickEffect(e);
	setTimeout(function(){ clickEffect(e); }, 100);
	setTimeout(function(){ clickEffect(e); }, 200);
	}

document.addEventListener('click',clickEffect1);
