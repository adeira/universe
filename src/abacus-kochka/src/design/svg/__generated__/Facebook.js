// @flow strict

import * as React from 'react';

import SVGIcon from '../SVGIcon';

type Props = {
  +color?: string,
  +size?: number,
};

export default function Facebook(props: Props): React.Node {
  const { color = '#fff', size = 40 } = props;
  return (
    <SVGIcon viewBox="0 0 1024 1024" color={color} size={size}>
      <defs>
        <path d="M.06.04H1024v1017.74H.06z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill={color}
          d="M1024 512C1024 229.23 794.77 0 512 0S0 229.23 0 512c0 255.554 187.231 467.37 432 505.78V660H302V512h130V399.2C432 270.88 508.438 200 625.39 200 681.407 200 740 210 740 210v126h-64.562C611.835 336 592 375.467 592 415.957V512h142l-22.7 148H592v357.78c244.769-38.41 432-250.226 432-505.78"
          mask="url(#b)"
        />
        <path d="M711.3 660L734 512H592v-96.043c0-40.49 19.835-79.957 83.438-79.957H740V210s-58.593-10-114.61-10C508.438 200 432 270.88 432 399.2V512H302v148h130v357.78c26.067 4.09 52.784 6.22 80 6.22s53.933-2.13 80-6.22V660h119.3" />
      </g>
    </SVGIcon>
  );
}
