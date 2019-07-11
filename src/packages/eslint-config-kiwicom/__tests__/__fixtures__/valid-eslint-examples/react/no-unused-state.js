// @flow strict

import * as React from 'react'; // eslint-disable-line import/no-extraneous-dependencies

type Props = {|
  +accessToken?: string,
  +children: React.Node,
|};

type State = {|
  accessToken: ?string,
|};

const MyContext = React.createContext<State>({
  accessToken: undefined,
});

export default class MyProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: props.accessToken ?? null,
    };
  }

  setAccessToken = (accessToken: ?string) => {
    this.setState({ accessToken });
  };

  render() {
    return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>;
  }
}
