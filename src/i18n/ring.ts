import type { TaskKey } from './day';

export type RingSlice = { task: TaskKey; minutes: number };

/**
 * A ring chart the way the Chart tab draws it: one slice per task, in the
 * order given, with a hair of space between. The lengths come back as CSS for
 * a style block – the CSP allows no style attributes – under class names that
 * start with `prefix`, unique per ring on a page. Each slice also gets its
 * delay, so a ring can fill slice by slice: as a transition when its section
 * is revealed, or as an animation (`.ring--draw`) when it is there at once.
 */
export function ring(slices: RingSlice[], r: number, gap: number, prefix: string) {
  const total = slices.reduce((sum, s) => sum + s.minutes, 0);
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const segments = slices.map((s, i) => {
    const length = (s.minutes / total) * circumference;
    const segment = { task: s.task, cls: `${prefix}-${i}`, dash: Math.max(length - gap, 0.5), offset };
    offset += length;
    return segment;
  });
  const css = segments
    .map((s, i) => {
      const delay = `${160 + i * 100}ms`;
      return `.${s.cls}{stroke-dasharray:${s.dash.toFixed(2)} ${circumference.toFixed(2)};stroke-dashoffset:${(-s.offset).toFixed(2)};transition-delay:${delay};animation-delay:${delay}}`;
    })
    .join('');
  return { total, segments, css };
}
