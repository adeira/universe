// @flow strict

import * as React from 'react'; // eslint-disable-line import/no-extraneous-dependencies

type Props = {|
  +accessToken?: string,
  +children: React.Node,
|};

type State = {|
  accessToken: ?string,
|};

const MyContext: React.Context<State> = React.createContext({
  accessToken: undefined,
});

export default class MyProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accessToken: props.accessToken ?? null,
    };
  }

  setAccessToken: (?string) => void = accessToken => {
    this.setState({ accessToken });
  };

  render(): React.Element<typeof MyContext.Provider> {
    return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>;
  }
}
