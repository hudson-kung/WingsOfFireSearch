(() => {
  const background = document.createElement('div');
  let activeBackground = 'assets/backgrounds/darkstalker.png';
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

  const applyMastheadWallpaper = () => {
    const masthead = document.querySelector('ytd-masthead');
    if (!masthead) return;
    const wallpaper = `url("${chrome.runtime.getURL(activeBackground)}")`;
    masthead.style.setProperty('background-image', wallpaper, 'important');
    masthead.style.setProperty('background-size', 'cover', 'important');
    masthead.style.setProperty('background-position', 'center', 'important');
    masthead.style.setProperty('background-attachment', 'fixed', 'important');
    masthead.style.setProperty('background-color', 'transparent', 'important');
    masthead.querySelectorAll('#background, #container, #frosted-glass, #scrim').forEach(element => {
      element.style.setProperty('background', 'transparent', 'important');
      element.style.setProperty('background-image', 'none', 'important');
    });
    if (masthead.shadowRoot && !masthead.shadowRoot.getElementById('wings-of-fire-masthead-style')) {
      const mastheadStyle = document.createElement('style');
      mastheadStyle.id = 'wings-of-fire-masthead-style';
      mastheadStyle.textContent = '#background, #container, #frosted-glass, #scrim { background: transparent !important; background-image: none !important; }';
      masthead.shadowRoot.append(mastheadStyle);
    }
  };

  const applyChipBarWallpaper = () => {
    const chipBar = document.querySelector('ytd-feed-filter-chip-bar-renderer');
    if (!chipBar) return;
    const wallpaper = `url("${chrome.runtime.getURL(activeBackground)}")`;
    chipBar.style.setProperty('background-image', wallpaper, 'important');
    chipBar.style.setProperty('background-size', 'cover', 'important');
    chipBar.style.setProperty('background-position', 'center', 'important');
    chipBar.style.setProperty('background-attachment', 'fixed', 'important');
    chipBar.style.setProperty('background-color', 'transparent', 'important');
    chipBar.querySelectorAll('#chips-wrapper, #chips, yt-horizontal-list-renderer, #left-arrow, #right-arrow').forEach(element => {
      element.style.setProperty('background', 'transparent', 'important');
      element.style.setProperty('background-image', 'none', 'important');
    });
    if (chipBar.shadowRoot && !chipBar.shadowRoot.getElementById('wings-of-fire-chip-bar-style')) {
      const chipStyle = document.createElement('style');
      chipStyle.id = 'wings-of-fire-chip-bar-style';
      chipStyle.textContent = '#chips-wrapper, #chips, #left-arrow, #right-arrow { background: transparent !important; background-image: none !important; }';
      chipBar.shadowRoot.append(chipStyle);
    }
  };

  const applyTheme = () => {
    [
      '--yt-spec-base-background',
      '--yt-spec-raised-background',
      '--yt-spec-menu-background',
      '--yt-spec-general-background-a',
      '--yt-spec-general-background-b',
      '--yt-spec-general-background-c',
      '--yt-spec-brand-background-solid',
      '--yt-spec-additive-background',
      '--ytd-masthead-background'
    ].forEach(variable => document.documentElement.style.setProperty(variable, 'transparent', 'important'));
    if (!document.getElementById(background.id)) document.body.prepend(background);
    if (!document.getElementById(style.id)) document.head.append(style);
    chrome.storage.local.get({ fanwingBackground: 'assets/backgrounds/darkstalker.png' }, ({ fanwingBackground }) => {
      activeBackground = fanwingBackground;
      background.style.backgroundImage = `url("${chrome.runtime.getURL(fanwingBackground)}")`;
      applyMastheadWallpaper();
      applyChipBarWallpaper();
    });
    new MutationObserver(() => {
      applyMastheadWallpaper();
      applyChipBarWallpaper();
    }).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.body) applyTheme();
  else document.addEventListener('DOMContentLoaded', applyTheme, { once: true });
})();
