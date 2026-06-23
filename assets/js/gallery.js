// SCROLL ANIMATIONS
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card');
const features = document.querySelectorAll('.feature');

function animateOnScroll() {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => { if(section.getBoundingClientRect().top < triggerBottom) section.classList.add('visible'); });
    cards.forEach(card => { if(card.getBoundingClientRect().top < triggerBottom) card.classList.add('visible'); });
    features.forEach(feature => { if(feature.getBoundingClientRect().top < triggerBottom) feature.classList.add('visible'); });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// FILE UPLOAD PREVIEW
const fileInput = document.getElementById('fileUpload');
fileInput.addEventListener('change', () => {
  const fileNameDiv = document.getElementById('fileName');
  fileNameDiv.textContent = fileInput.files.length > 0 ? 'Selected file: ' + fileInput.files[0].name : '';
});

// DYNAMISCHE STERREN ACHTERGROND
const starsContainer = document.getElementById('stars');
const numberOfStars = 150;
for(let i=0;i<numberOfStars;i++){
    const star = document.createElement('div');
    star.className='star';
    star.style.top = Math.random() * document.body.scrollHeight + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    const size=Math.random()*6+3;
    star.style.width=size+'px';
    star.style.height=size+'px';
    star.style.opacity=Math.random()*0.8+0.2;
    star.style.animationDuration=(Math.random()*3+2)+'s';
    starsContainer.appendChild(star);
}