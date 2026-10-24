(() => {
  const panel = document.getElementById('aefing-thrihyrningar');
  const frame = document.getElementById('thrihyrningar-frame');
  if (!panel || !frame) return;
  const load = () => {
    if (panel.open && !frame.hasAttribute('src')) frame.src = frame.dataset.src;
  };
  panel.addEventListener('toggle', load);
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type !== 'lota28-exercise-height' || !Number.isFinite(event.data.height)) return;
    frame.style.height = Math.max(600, Math.min(5000, Math.ceil(event.data.height))) + 'px';
  });
  const openFromLink = () => {
    if (location.hash === '#aefing-thrihyrningar') {
      panel.open = true;
      load();
    }
  };
  window.addEventListener('hashchange', openFromLink);
  openFromLink();
  load();
})();
