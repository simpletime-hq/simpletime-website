// The running task's clock wherever the page shows it – the Live Activity,
// the widget, the Dynamic Island, the watch: every [data-live] counts on from
// the time in its markup, on the beat of whole seconds. [data-live-short] drops
// the hours; [data-live-digits="arab"] counts in Arabic-Indic digits, as the
// watch does in Arabic.
//
// Only clocks in view tick, and none while the tab is in the background: one
// timer for all of them, stopped when nobody can see a clock (audit 19.11.2026 –
// five clocks kept rewriting their text once a second off-screen). The time comes
// from the start, so a clock that scrolls back in shows the right second at once.
const pad = (n: number) => String(n).padStart(2, '0');
const ARABIC = '٠١٢٣٤٥٦٧٨٩';
const arabic = (s: string) => s.replace(/\d/g, (d) => ARABIC[Number(d)]);

type Clock = { card: HTMLElement; timers: HTMLElement[]; start: number; seen: boolean };

const clocks: Clock[] = [...document.querySelectorAll<HTMLElement>('[data-live]')].flatMap((card) => {
  const timers = [...card.querySelectorAll<HTMLElement>('[data-live-timer]')];
  return timers.length ? [{ card, timers, start: Date.now() - Number(card.dataset.elapsed ?? 0) * 1000, seen: false }] : [];
});

const render = ({ timers, start }: Clock) => {
  const seconds = Math.floor((Date.now() - start) / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = pad(seconds % 60);
  timers.forEach((timer) => {
    const text = timer.hasAttribute('data-live-short') && h === 0 ? `${m}:${s}` : `${h}:${pad(m)}:${s}`;
    timer.textContent = timer.dataset.liveDigits === 'arab' ? arabic(text) : text;
  });
};

if (clocks.length) {
  clocks.forEach(render);

  let beat = 0;
  let every = 0;
  const tick = () => clocks.forEach((clock) => clock.seen && render(clock));
  const stop = () => {
    window.clearTimeout(beat);
    window.clearInterval(every);
    beat = every = 0;
  };
  const go = () => {
    if (beat || every || document.hidden || !clocks.some((clock) => clock.seen)) return;
    tick();
    // On the beat of the clocks' whole seconds, as before.
    beat = window.setTimeout(() => {
      beat = 0;
      tick();
      every = window.setInterval(tick, 1000);
    }, 1000 - ((Date.now() - clocks[0].start) % 1000));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const clock = clocks.find((c) => c.card === entry.target);
        if (!clock) continue;
        clock.seen = entry.isIntersecting;
        if (clock.seen) render(clock);
      }
      if (clocks.some((clock) => clock.seen)) go();
      else stop();
    },
    { rootMargin: '120px' },
  );
  clocks.forEach((clock) => observer.observe(clock.card));
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : go()));
}
