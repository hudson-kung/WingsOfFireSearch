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
      color: #ffe9a6 !important;
    }
    #search, #rso { border: 0 !important; padding: 18px !important; }
    #search *, #rso *, #appbar *, #top_nav *, #rhs *, #botstuff *, #foot * { color: #ffe9a6 !important; text-shadow: 0 2px 4px #000 !important; }
    #search a:visited, #rso a:visited { color: #e7ca7a !important; }
  `;

  const addTheme = () => {
    if (!document.getElementById(background.id)) document.body.prepend(background);
    if (!document.getElementById('wings-of-fire-results-style')) {
      style.id = 'wings-of-fire-results-style';
      document.head.append(style);
    }
  };

  if (document.body) addTheme();
  else document.addEventListener('DOMContentLoaded', addTheme, { once: true });
})();
