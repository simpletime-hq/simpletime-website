// The running task's clock wherever the page shows it – the Live Activity,
// the widget, the Dynamic Island: every [data-live] counts on from the time in
// its markup, on the beat of whole seconds. [data-live-short] drops the hours.
const pad = (n: number) => String(n).padStart(2, '0');

document.querySelectorAll<HTMLElement>('[data-live]').forEach((card) => {
  const timers = card.querySelectorAll<HTMLElement>('[data-live-timer]');
  if (!timers.length) return;
  const start = Date.now() - Number(card.dataset.elapsed ?? 0) * 1000;

  const tick = () => {
    const seconds = Math.floor((Date.now() - start) / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = pad(seconds % 60);
    timers.forEach((timer) => {
      timer.textContent = timer.hasAttribute('data-live-short') && h === 0 ? `${m}:${s}` : `${h}:${pad(m)}:${s}`;
    });
  };
  tick();
  window.setTimeout(() => {
    tick();
    window.setInterval(tick, 1000);
  }, 1000 - ((Date.now() - start) % 1000));
});
