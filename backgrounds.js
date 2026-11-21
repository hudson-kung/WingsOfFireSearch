const cards = [...document.querySelectorAll('.card')];
const current = localStorage.getItem('fanwing-background') || 'assets/backgrounds/darkstalker.png';

function select(image, name) {
  localStorage.setItem('fanwing-background', image);
  chrome.storage.local.set({ fanwingBackground: image });
  cards.forEach(card => card.classList.toggle('selected', card.dataset.image === image));
  document.getElementById('notice').textContent = `${name} selected. Return to search to see it.`;
}

cards.forEach(card => {
  if (card.dataset.image === current) card.classList.add('selected');
  card.addEventListener('click', () => select(card.dataset.image, card.querySelector('.label').textContent));
});
