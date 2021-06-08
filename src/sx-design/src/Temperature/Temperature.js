// @flow

import React, { type Node } from 'react';
import { formatNumber } from 'fbt/lib/intlNumUtils';

import useSxDesignContext from '../useSxDesignContext';

type Props = {
  +degreesCelsius: number,
};

/**
 * This component accepts temperature in Celsius degrees and renders it correctly with `°C` or `°F`
 * based on the active locale. Note on `&#x2109;` (℉) and `&#x2103;` (℃) HTML entities: we follow
 * a recommendation from The Unicode® Standard (Version 13.0):
 *
 * > In normal use, it is better to represent degrees Celsius "°C" with a sequence of U+00B0 (degree
 * > sign) + U+0043 (latin capital letter c), rather than U+2103 (degree celsius). Similarly, the
 * > sequence U+00B0 (degree sign) + U+0046 (latin capital letter f) is preferred over U+2109
 * > (degree fahrenheit).
 *
 * See (22.2 Letterlike Symbols): https://www.unicode.org/versions/Unicode13.0.0/UnicodeStandard-13.0.pdf
 */
export default function Temperature(props: Props): Node {
  const { locale } = useSxDesignContext();
  if (locale === 'en-US') {
    const degreesFarenheit = props.degreesCelsius * (9 / 5) + 32;
    return <>{formatNumber(degreesFarenheit, 0)}&nbsp;°F</>;
  }
  return <>{props.degreesCelsius}&nbsp;°C</>;
}
