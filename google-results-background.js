(() => {
  const background = document.createElement('div');
  background.id = 'wings-of-fire-results-background';
  background.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:0',
    'background-image:linear-gradient(rgba(22,13,19,.68),rgba(22,13,19,.78)),url("' + chrome.runtime.getURL('assets/backgrounds/darkstalker.png') + '")',
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
    #viewport, #main, #rcnt, #center_col, #rhs, #botstuff, #foot { background-color: transparent !important; }
    #searchform, #appbar, #top_nav, #top_nav > *, #foot, #botstuff { background-color: rgba(22, 13, 19, .82) !important; }
    #search, #center_col { background: rgba(22, 13, 19, .72) !important; border-radius: 12px; padding: 12px !important; }
    #search h3, #search a, #search span, #search div { text-shadow: 0 1px 2px rgba(0,0,0,.7); }
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
