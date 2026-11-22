(() => {
  const background = document.createElement('div');
  background.id = 'wings-of-fire-chatgpt-background';
  background.style.cssText = 'position:fixed;inset:0;z-index:-1;background:center/cover fixed no-repeat;pointer-events:none';

  const style = document.createElement('style');
  style.id = 'wings-of-fire-chatgpt-style';
  style.textContent = `
    html, body, main, header, nav, aside, [class*="bg-"] { background-color: transparent !important; }
    body > *:not(#wings-of-fire-chatgpt-background) { position: relative; z-index: 1; }
    body, body *, body *::before, body *::after { color: #f9c64a !important; text-shadow: 0 1px 3px #000 !important; }
  `;

  const clearLightSurfaces = root => {
    const elements = root.querySelectorAll ? [root, ...root.querySelectorAll('*')] : [];
    elements.forEach(element => {
      if (!(element instanceof HTMLElement) || element.id === background.id) return;
      const match = getComputedStyle(element).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!match) return;
      const [red, green, blue, alpha = '0'] = match[1].split(',').map(value => Number(value.trim()));
      if (red > 220 && green > 220 && blue > 220 && alpha > .45) {
        element.style.setProperty('background', 'transparent', 'important');
        element.style.setProperty('box-shadow', 'none', 'important');
      }
    });
  };

  const applyTheme = () => {
    if (!document.getElementById(background.id)) document.body.prepend(background);
    if (!document.getElementById(style.id)) document.head.append(style);
    chrome.storage.local.get({ fanwingBackground: 'assets/backgrounds/darkstalker.png' }, ({ fanwingBackground }) => {
      background.style.backgroundImage = `url("${chrome.runtime.getURL(fanwingBackground)}")`;
    });
    clearLightSurfaces(document.body);
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) clearLightSurfaces(node);
    }))).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.body) applyTheme();
  else document.addEventListener('DOMContentLoaded', applyTheme, { once: true });
})();
