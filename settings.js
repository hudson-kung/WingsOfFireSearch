const storageKey = 'fanwing-settings';
const preferences = JSON.parse(localStorage.getItem(storageKey) || '{"newTab":false,"luckyDefault":false}');
const newTab = document.getElementById('new-tab');
const luckyDefault = document.getElementById('lucky-default');

newTab.checked = preferences.newTab;
luckyDefault.checked = preferences.luckyDefault;
document.getElementById('save-settings').addEventListener('click', () => {
  preferences.newTab = newTab.checked;
  preferences.luckyDefault = luckyDefault.checked;
  localStorage.setItem(storageKey, JSON.stringify(preferences));
  document.getElementById('saved').textContent = 'Settings saved.';
});
