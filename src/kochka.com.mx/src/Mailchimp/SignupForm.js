// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Input from '../design/Input';
import InputSubmit from '../design/InputSubmit';

export default function SignupForm(): React.Node {
  const [state, setState] = React.useState({
    emailValue: '',
    antispamText: '',
  });

  return (
    <form
      action="https://kochka.us2.list-manage.com/subscribe/post?u=74e8308bd8d8dc9366d1d2b96&amp;id=3121dfe59f"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate
    >
      <div className={styles('row')}>
        <Input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          placeholder={
            <fbt desc="email address placeholder of a subscribe form">Email Address</fbt>
          }
          value={state.emailValue}
          onChange={(event) =>
            setState((prevState) => ({
              ...prevState,
              emailValue: event.target.value,
            }))
          }
          xstyle={styles.emailInput}
        />
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }} />
          <div className="response" id="mce-success-response" style={{ display: 'none' }} />
        </div>
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
          <Input
            type="text"
            name="b_74e8308bd8d8dc9366d1d2b96_3121dfe59f"
            tabIndex={-1}
            value={state.antispamText}
            onChange={(event) =>
              setState((prevState) => ({
                ...prevState,
                antispamText: event.target.value,
              }))
            }
          />
        </div>
        <InputSubmit
          value={<fbt desc="'let me know' button of a subscribe form">Let me know!</fbt>}
          name="subscribe"
          id="mc-embedded-subscribe"
        />
      </div>
    </form>
  );
}

const styles = sx.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  emailInput: {
    marginRight: 5,
  },
});
