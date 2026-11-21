(() => {
  const background = document.createElement('div');
  background.id = 'wings-of-fire-results-background';
  background.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:0',
    'background-image:url("' + chrome.runtime.getURL('assets/backgrounds/darkstalker.png') + '")',
    'background-size:cover',
    'background-position:center',
    'background-attachment:fixed'
  ].join(';');

  const style = document.createElement('style');
  style.textContent = `
    html, body { background: #160d13 !important; }
    body { background-color: transparent !important; }
    body > *:not(#wings-of-fire-results-background) { position: relative !important; z-index: 1; }
    #wings-of-fire-results-background { pointer-events: none !important; }
    #viewport, #main, #rcnt, #center_col, #rhs, #botstuff, #foot,
    #searchform, #appbar, #top_nav, #top_nav > *, #search, #rso,
    #search * , #rso * {
      background-color: transparent !important;
      color: #f9c64a !important;
    }
    #search, #rso { border: 0 !important; padding: 18px !important; }
    body *, body *::before, body *::after { color: #f9c64a !important; }
    #search *, #rso *, #appbar *, #top_nav *, #rhs *, #botstuff *, #foot * { color: #f9c64a !important; text-shadow: 0 2px 4px #000 !important; }
    #search a:visited, #rso a:visited { color: #f9c64a !important; }
    mark, em, [role="mark"] { background: transparent !important; color: inherit !important; font-style: inherit !important; font-weight: inherit !important; }
    #search, #search *, #rso, #rso *, #rhs, #rhs *, #appbar, #appbar *, #top_nav, #top_nav *, #botstuff, #botstuff *, #foot, #foot *, input, textarea, button { font-family: Georgia, "Times New Roman", serif !important; }
  `;

  const makeWhiteSurfacesBlack = root => {
    const elements = root.querySelectorAll ? [root, ...root.querySelectorAll('*')] : [];
    elements.forEach(element => {
      if (!(element instanceof HTMLElement)) return;
      const match = getComputedStyle(element).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!match) return;
      const [red, green, blue, alpha = '1'] = match[1].split(',').map(value => Number(value.trim()));
      const hasGlowGradient = getComputedStyle(element).backgroundImage.includes('gradient');
      if ((red > 220 && green > 220 && blue > 220 && alpha > 0.6) || hasGlowGradient) {
        element.style.setProperty('background', '#160d13', 'important');
        element.style.setProperty('color', '#f9c64a', 'important');
        element.style.setProperty('border-color', '#8d6716', 'important');
        element.style.setProperty('box-shadow', 'none', 'important');
        element.style.setProperty('filter', 'none', 'important');
      }
    });
  };

  const hideAiOverview = root => {
    if (!root.querySelectorAll) return;
    root.querySelectorAll('*').forEach(element => {
      if (element.children.length || element.textContent.trim() !== 'AI Overview') return;
      const resultModule = element.closest('.MjjYud');
      if (resultModule) resultModule.style.setProperty('display', 'none', 'important');
    });
  };

  const replaceGoogleLogo = () => {
    const logoLink = [...document.querySelectorAll('a')].find(link => {
      const label = link.getAttribute('aria-label') || '';
      const imageAlt = link.querySelector('img')?.alt || '';
      return /google/i.test(label) || /google/i.test(imageAlt);
    });
    if (!logoLink || logoLink.dataset.wingsOfFireLogo === 'true') return;

    logoLink.dataset.wingsOfFireLogo = 'true';
    logoLink.replaceChildren();
    Object.assign(logoLink.style, {
      display: 'block',
      width: '44px',
      height: '44px',
      minWidth: '44px',
      backgroundImage: `url("${chrome.runtime.getURL('assets/fanwing-crest.png')}")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    });
    logoLink.setAttribute('aria-label', 'Back to Wings of Fire Search');
    logoLink.addEventListener('click', event => {
      event.preventDefault();
      chrome.runtime.sendMessage({ type: 'open-wings-of-fire-home' });
    });
  };

  const addTheme = () => {
    if (!document.getElementById(background.id)) document.body.prepend(background);
    if (!document.getElementById('wings-of-fire-results-style')) {
      style.id = 'wings-of-fire-results-style';
      document.head.append(style);
    }
    makeWhiteSurfacesBlack(document.body);
    hideAiOverview(document);
    replaceGoogleLogo();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          makeWhiteSurfacesBlack(node);
          hideAiOverview(node);
          replaceGoogleLogo();
        }
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.body) addTheme();
  else document.addEventListener('DOMContentLoaded', addTheme, { once: true });
})();
