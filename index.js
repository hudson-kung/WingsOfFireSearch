const form = document.getElementById('search-form');
const input = document.getElementById('query');
const storageKey = 'fanwing-settings';
const preferences = JSON.parse(localStorage.getItem(storageKey) || '{"newTab":false,"luckyDefault":false}');
const background = localStorage.getItem('fanwing-background') || 'assets/backgrounds/darkstalker.png';

document.body.style.backgroundImage = `url("${background}")`;
chrome.storage.local.get({ fanwingBackground: background }, ({ fanwingBackground }) => {
  document.body.style.backgroundImage = `url("${fanwingBackground}")`;
  localStorage.setItem('fanwing-background', fanwingBackground);
});
document.getElementById('clear-search').addEventListener('click', () => {
  input.value = '';
  input.focus();
});

function search(lucky) {
  const q = input.value.trim();
  if (!q) { input.focus(); return; }
  const url = `https://www.google.com/search?${lucky ? 'btnI=1&' : ''}q=${encodeURIComponent(q)}`;
  if (preferences.newTab) window.open(url, '_blank', 'noopener');
  else location.href = url;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  search(preferences.luckyDefault);
});

const videos = [
  ['Wings of Fire Animation — Episode 1', 'https://www.youtube.com/watch?v=pyNqlTX1NF4'],
  ['Wings of Fire MAP animations', 'https://www.youtube.com/results?search_query=wings+of+fire+map+animation'],
  ['Darkstalker fan films', 'https://www.youtube.com/results?search_query=wings+of+fire+darkstalker+fan+film'],
  ['AnimatedWings series', 'https://www.youtube.com/@AnimatedWings'],
  ['Wings of Fire animatics', 'https://www.youtube.com/results?search_query=wings+of+fire+animatic'],
  ['Wings of Fire animation memes', 'https://www.youtube.com/results?search_query=wings+of+fire+animation+meme']
];

videos.sort(() => Math.random() - .5).slice(0, 3).forEach(([title, url]) => {
  const card = document.createElement('a');
  card.className = 'video-card';
  card.href = url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.innerHTML = `<span>▶ YouTube</span><strong>${title}</strong>`;
  document.getElementById('video-row').append(card);
});
