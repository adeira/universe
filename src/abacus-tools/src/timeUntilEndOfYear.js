// @flow strict

export function timeUntilEndOfYear(now: Date = new Date()): string {
  // Calculate the end of the year
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  // Calculate the difference in milliseconds
  // $FlowFixMe[unsafe-arithmetic]: Date - Date
  const diffMs = endOfYear - now;

  // Convert the difference to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Create a RelativeTimeFormat object
  // $FlowFixMe[prop-missing]: RelativeTimeFormat is not yet supported by Flow
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Return the time difference
  return rtf.format(diffDays, 'day');
}
