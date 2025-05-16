// Optional: Click to expand image
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%;">`;

    modal.addEventListener('click', () => document.body.removeChild(modal));
    document.body.appendChild(modal);
  });
});

//Scrolldown
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const boxTop = sec.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      sec.classList.add("visible");
    }
  });
});


let currentGroup = 0;

document.querySelectorAll('.gallery-wrap').forEach(galleryWrap => {
  const gallery = galleryWrap.querySelector('.gallery');
  const images = gallery.querySelectorAll('img');
  const imagesPerView = 3;

  function updateGallery() {
    const imgWidth = images[0].clientWidth + 10;
    const offset = currentGroup * imgWidth * imagesPerView;
    gallery.style.transform = `translateX(-${offset}px)`;
  }

  galleryWrap.querySelector('.next').addEventListener('click', () => {
    if ((currentGroup + 1) * imagesPerView < images.length) {
      currentGroup++;
      updateGallery();
    }
  });

  galleryWrap.querySelector('.prev').addEventListener('click', () => {
    if (currentGroup > 0) {
      currentGroup--;
      updateGallery();
    }
  });

  window.addEventListener('resize', updateGallery);
});


//Popup
function closeSplash(person) {
  console.log("Chosen:", person); // optional use
  const splash = document.getElementById("splash-popup");
  splash.style.transition = "opacity 0.5s ease";
  splash.style.opacity = "0";
  setTimeout(() => splash.style.display = "none", 500);
}


const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

for (let i = 0; i < 40; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.5 + 0.3,
    drift: (Math.random() - 0.5) * 0.5,
  });
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 50, size / 50);
  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.moveTo(25, 15);
  ctx.bezierCurveTo(25, 0, 0, 0, 0, 15);
  ctx.bezierCurveTo(0, 30, 25, 45, 25, 45);
  ctx.bezierCurveTo(25, 45, 50, 30, 50, 15);
  ctx.bezierCurveTo(50, 0, 25, 0, 25, 15);
  ctx.fillStyle = "#e91e63";
  ctx.fill();
  ctx.restore();
}

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let h of hearts) {
    h.pulse += 0.05; // increase pulse
    h.size = h.baseSize + Math.sin(h.pulse) * 4;
  
    drawHeart(h.x, h.y, h.size, h.alpha);
    h.y -= h.speed;
    h.x += h.drift;
  
    if (h.y < -50) {
      h.y = canvas.height + 50;
      h.x = Math.random() * canvas.width;
      h.pulse = Math.random() * Math.PI * 2;
    }
  }
  

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


hearts.push({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 20 + 10,
  baseSize: Math.random() * 20 + 10,
  speed: Math.random() * 1 + 0.5,
  alpha: Math.random() * 0.5 + 0.3,
  drift: (Math.random() - 0.5) * 0.5,
  pulse: Math.random() * Math.PI * 2,
});



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.reveal, .fade-left, .fade-right, .zoom-in, .rotate-in, .bounce-in')
  .forEach(elem => observer.observe(elem));
