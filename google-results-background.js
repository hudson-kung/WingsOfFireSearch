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
  chrome.storage.local.get({ fanwingBackground: 'assets/backgrounds/darkstalker.png' }, ({ fanwingBackground }) => {
    background.style.backgroundImage = `url("${chrome.runtime.getURL(fanwingBackground)}")`;
  });

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
    #searchform, #appbar, #gb { transform: translateY(-64px) !important; }
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

  const softenShowMoreBackdrop = root => {
    if (!root.querySelectorAll) return;
    root.querySelectorAll('*').forEach(element => {
      if (element.children.length || element.textContent.trim() !== 'Show more') return;
      const module = element.closest('.MjjYud') || element.closest('[data-ved]');
      if (!module) return;
      module.style.setProperty('background', 'rgba(22, 13, 19, .48)', 'important');
      module.querySelectorAll('*').forEach(child => {
        if (child.style.background.includes('#160d13')) {
          child.style.setProperty('background', 'transparent', 'important');
        }
      });
    });
  };

  const replaceGoogleLogo = () => {
    if (document.documentElement.dataset.wingsOfFireLogoReplaced === 'true') return;
    const logoLink = [...document.querySelectorAll('a')]
      .filter(link => {
        const label = link.getAttribute('aria-label') || '';
        const imageAlt = link.querySelector('img')?.alt || '';
        const bounds = link.getBoundingClientRect();
        return (/google/i.test(label) || /google/i.test(imageAlt)) && bounds.width > 0 && bounds.height > 0;
      })
      .sort((first, second) => first.getBoundingClientRect().left - second.getBoundingClientRect().left)[0];
    if (!logoLink) return;

    document.documentElement.dataset.wingsOfFireLogoReplaced = 'true';
    logoLink.dataset.wingsOfFireLogo = 'true';
    logoLink.replaceChildren();
    Object.assign(logoLink.style, {
      display: 'block',
      width: '104px',
      height: '104px',
      minWidth: '104px',
      margin: '0 20px',
      transform: 'translateY(-32px)',
      backgroundImage: `url("${chrome.runtime.getURL('assets/fanwing-crest.png')}")`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '50%'
    });
    logoLink.setAttribute('aria-label', 'Back to SilkSearch');
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
    softenShowMoreBackdrop(document);
    replaceGoogleLogo();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          makeWhiteSurfacesBlack(node);
          hideAiOverview(node);
          softenShowMoreBackdrop(node);
          replaceGoogleLogo();
        }
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.body) addTheme();
  else document.addEventListener('DOMContentLoaded', addTheme, { once: true });
})();
