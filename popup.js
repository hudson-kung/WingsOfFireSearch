const toggle = document.getElementById('theme-toggle');
const status = document.getElementById('status');

chrome.storage.local.get({ googleThemeEnabled: true }, ({ googleThemeEnabled }) => {
  toggle.checked = googleThemeEnabled;
  status.textContent = googleThemeEnabled ? 'On' : 'Off';
});

toggle.addEventListener('change', async () => {
  const enabled = toggle.checked;
  await chrome.storage.local.set({ googleThemeEnabled: enabled });
  status.textContent = enabled ? 'On' : 'Off';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id && /^https:\/\/www\.google\.com\/search/.test(tab.url || '')) {
    await chrome.tabs.reload(tab.id);
  }
});
