const MAX_TITLE_LENGTH = 22;

export function truncateTitle(input: string): string {
  if (input.length <= MAX_TITLE_LENGTH) {
    return input;
  } else {
    return input.slice(0, MAX_TITLE_LENGTH) + '...';
  }
}
