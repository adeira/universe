// @flow strict

// eslint-disable-next-line import/no-extraneous-dependencies
import { createContext, Component, type Node, type Context, type Element } from 'react';

type Props = {
  +accessToken?: string,
  +children: Node,
};

type State = {
  accessToken: ?string,
};

const MyContext: Context<State> = createContext({
  accessToken: undefined,
});

export default class MyProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: props.accessToken ?? null,
    };
  }

  setAccessToken: (?string) => void = (accessToken) => {
    this.setState({ accessToken });
  };

  render(): Element<typeof MyContext.Provider> {
    return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>;
  }
}
