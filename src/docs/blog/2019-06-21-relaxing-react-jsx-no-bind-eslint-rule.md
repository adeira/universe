---
author: Martin Zlámal
authorURL: https://github.com/mrtnzlml
title: Relaxing react/jsx-no-bind eslint rule
---

Recently, I significantly relaxed Eslint rule [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) (in [`@kiwicom/eslint-config`](https://www.npmjs.com/package/@kiwicom/eslint-config) version 4.10.0). This article tries to explain what was this rule for and why I decided to change it.

Originally, this rule enabled performance optimizations for free + it taught developers how to decompose components better. Typical use-case was to avoid unnecessary re-renders of pure components. For example, look at this _constructed and modified_ [example from React docs](https://reactjs.org/docs/faq-functions.html#how-do-i-pass-a-parameter-to-an-event-handler-or-callback):

```js
const A = 65; // ASCII character code

class Letter extends React.PureComponent {
  render() {
    console.warn('Rendering letter %s', this.props.letter);
    return <li onClick={this.props.onClick}>{this.props.letter}</li>;
  }
}

export default class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i)),
    };
  }
  handleClick(letter) {
    this.setState({ justClicked: letter });
  }
  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter => (
            <Letter
              key={letter}
              letter={letter}
              onClick={() => this.handleClick(letter)} // <<< Mm, not great 🤔
            />
          ))}
        </ul>
      </div>
    );
  }
}
```

This is good except it re-renders every single `Letter` component every time you click on the letter (even though only `Alphabet` component should be re-rendered). Eslint rule `react/jsx-no-bind` forced React developers to rewrite it a little bit, for example, one quick solution would be this:

```js
class Letter extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.letter);
  };
  render() {
    console.warn('Rendering letter %s', this.props.letter);
    return <li onClick={this.handleClick}>{this.props.letter}</li>;
  }
}

export default class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i)),
    };
  }
  handleClick(letter) {
    this.setState({ justClicked: letter });
  }
  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter => (
            <Letter key={letter} letter={letter} onClick={this.handleClick} />
          ))}
        </ul>
      </div>
    );
  }
}
```

It visually works the same except it **doesn't** re-render every `Letter` component on every click - only `Alphabet` component. It's still [a recommended way](https://reactjs.org/docs/faq-functions.html#example-passing-params-using-data-attributes) how to write these components. However, this rule doesn't make much sense when using [`useState` React hook](https://reactjs.org/docs/hooks-reference.html#usestate). It's because developers learned how to workaround it and the actual working solution is not so "for free" like in the previous example. Possible functional implementation could look like this:

```js
class Letter extends React.PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.letter);
  };
  render() {
    console.warn('Rendering letter %s', this.props.letter);
    return <li onClick={this.handleClick}>{this.props.letter}</li>;
  }
}

export default function Alphabet() {
  const [justClicked, updateJustClicked] = useState(null);
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(A + i),
  );

  const memoizedHandleClick = useCallback(letter => {
    updateJustClicked(letter);
  }, []);

  return (
    <div>
      Just clicked: {justClicked}
      <ul>
        {letters.map(letter => (
          <Letter key={letter} letter={letter} onClick={memoizedHandleClick} />
        ))}
      </ul>
    </div>
  );
}
```

It's not horrible but you have to know how to do it properly and, what's worse, Eslint rule `react/jsx-no-bind` cannot handle incorrect implementation (cases when you don't use `useCallback` memoization). This forced some developers to use some patterns which were also wrong but it looked like they are not. It would still be bad even with the Eslint rule fixed - you'd still have to use memoization for every single functional callback even though it's maybe not necessary.

This rule was relatively straightforward to follow in class components and you potentially got the free optimization. However, the situation is different with functional components. Moreover, optimized child components are not so common. For this reason I decided to relax this rule and rely only on intentional optimizations done by developers - you can now freely use these patterns which were previously disabled.

Thanks Jaroslav Kubíček from SFAQ for starting this initiative.
