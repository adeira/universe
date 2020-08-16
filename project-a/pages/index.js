// @flow

import * as React from 'react';

// import './Home.css';
// import KochkaIcon from './KochkaIcon.svg';
import Rules from '../src/Rules';

export default class Home extends React.Component<{||}> {
  render(): React.Node {
    return (
      <>
        {/* <img src={KochkaIcon} className="Home-logo" alt="logo" /> */}
        <Rules />
      </>
    );
  }
}
