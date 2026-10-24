(() => {
  if (window.parent === window) return;
  const parentOrigin = document.referrer ? new URL(document.referrer).origin : location.origin;
  const targetOrigin = location.protocol === 'file:' || parentOrigin === 'null' ? '*' : parentOrigin;
  let previous = 0;
  const report = () => {
    const height = Math.ceil(document.body.getBoundingClientRect().height) + 16;
    if (height === previous) return;
    previous = height;
    window.parent.postMessage({type: 'ggj-exercise-height', height}, targetOrigin);
  };
  new ResizeObserver(report).observe(document.body);
  window.addEventListener('load', report);
  report();
})();

