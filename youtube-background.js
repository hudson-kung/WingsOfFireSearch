(() => {
  const background = document.createElement('div');
  background.id = 'wings-of-fire-youtube-background';
  background.style.cssText = 'position:fixed;inset:0;z-index:-1;background:center/cover fixed no-repeat;pointer-events:none';

  const style = document.createElement('style');
  style.id = 'wings-of-fire-youtube-style';
  style.textContent = `
    html, body, ytd-app, ytd-page-manager, ytd-browse, ytd-watch-flexy,
    #page-manager, #content, #primary, #secondary, #columns, #masthead-container,
    ytd-masthead, ytd-rich-grid-renderer, ytd-two-column-browse-results-renderer,
    ytd-rich-item-renderer, ytd-video-renderer { background: transparent !important; }
    ytd-masthead#masthead, #masthead-container, ytd-masthead #container,
    ytd-masthead #background, ytd-masthead #frosted-glass, ytd-masthead #scrim {
      background: transparent !important;
      background-image: none !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
    }
    body > *:not(#wings-of-fire-youtube-background) { position: relative; z-index: 1; }
    body, body *, body *::before, body *::after { color: #f9c64a !important; text-shadow: 0 1px 3px #000 !important; }
    :root { --yt-spec-text-primary: #f9c64a !important; --yt-spec-text-secondary: #f9c64a !important; --yt-spec-call-to-action: #f9c64a !important; --yt-spec-base-background: transparent !important; --yt-spec-raised-background: transparent !important; }
  `;

  const applyTheme = () => {
    if (!document.getElementById(background.id)) document.body.prepend(background);
    if (!document.getElementById(style.id)) document.head.append(style);
    chrome.storage.local.get({ fanwingBackground: 'assets/backgrounds/darkstalker.png' }, ({ fanwingBackground }) => {
      background.style.backgroundImage = `url("${chrome.runtime.getURL(fanwingBackground)}")`;
    });
  };

  if (document.body) applyTheme();
  else document.addEventListener('DOMContentLoaded', applyTheme, { once: true });
})();
