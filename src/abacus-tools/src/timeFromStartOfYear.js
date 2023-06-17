// @flow strict

export function timeFromStartOfYear(now: Date = new Date()): string {
  // Calculate the start of the year
  const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);

  // Calculate the difference in milliseconds
  // $FlowFixMe[unsafe-arithmetic]: Date - Date
  const diffMs = now - startOfYear;

  // Convert the difference to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Create a RelativeTimeFormat object
  // $FlowFixMe[prop-missing]: RelativeTimeFormat is not yet supported by Flow
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Return the time difference
  return rtf.format(-diffDays, 'day');
}
