// Make sure we can always sleep even if we're using fake timers elsewhere
const originalSetTimetout = globalThis.setTimeout;

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => originalSetTimetout(resolve, ms));
