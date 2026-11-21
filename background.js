chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== 'open-wings-of-fire-home' || sender.tab?.id == null) return;
  chrome.tabs.update(sender.tab.id, { url: chrome.runtime.getURL('index.html') });
});
