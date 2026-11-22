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

