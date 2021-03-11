// @flow strict

/*
eslint-disable
no-console,
import/no-extraneous-dependencies,
react/no-multi-comp
*/

import { PureComponent, Component, useState, type Element } from 'react';

type LetterProps = {
  +letter: string,
  +onClick: () => void,
};

const A = 65; // ASCII character code

class Letter extends PureComponent<LetterProps> {
  render() {
    console.warn('Rendering letter %s', this.props.letter);
    return <li onClick={this.props.onClick}>{this.props.letter}</li>;
  }
}

type AplhabetProps = {};

type AplhabetState = {
  justClicked: null | string,
  letters: $ReadOnlyArray<string>,
};

export class Alphabet1 extends Component<AplhabetProps, AplhabetState> {
  constructor(props: AplhabetProps) {
    super(props);
    this.state = {
      justClicked: null,
      letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i)),
    };
  }

  handleClick: (string) => void = (letter) => {
    this.setState({ justClicked: letter });
  };

  render(): Element<'div'> {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map((letter) => (
            <Letter
              key={letter}
              letter={letter}
              onClick={() => this.handleClick(letter)} // <<<<<
            />
          ))}
        </ul>
      </div>
    );
  }
}

export function Alphabet2(): Element<'div'> {
  const [justClicked, updateJustClicked] = useState(null);
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i));

  const handleClick = (letter) => {
    updateJustClicked(letter);
  };

  return (
    <div>
      Just clicked: {justClicked}
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter}
            letter={letter}
            onClick={() => handleClick(letter)} // <<<<<
          />
        ))}
      </ul>
    </div>
  );
}
