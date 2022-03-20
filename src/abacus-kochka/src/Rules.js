// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

export default function Rules(): React.Node {
  return (
    <div>
      <p>
        <fbt desc="paragraph">
          We have 3 main rules that everyone must follow when visiting KOCHKA Café:
        </fbt>
      </p>
      <div>
        <ol className={styles('orderedListUpperRoman')}>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              It is <strong>prohibited to give our cats any food or drinks</strong>. It can be
              dangerous for them. They have their own diet, Please, protect your plates and cups.
            </fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              Every visitor must <strong>treat our cats respectfully</strong>. Treat them like any
              other adult person - they are not kids. We ask you not to cary them. Wait for them to
              approach you instead.
            </fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              Be careful when entering KOCHKA Café so that our cats do not run away.
            </fbt>
          </li>
        </ol>
      </div>
      <p>
        <fbt desc="paragraph">Additionally, we have other rules that are just as important:</fbt>
      </p>
      <div>
        <ol className={styles('orderedListUpperRoman')}>
          <li className={styles('listItem')}>
            <fbt desc="rule">Do not wake up our cats or interrupt them while they are eating.</fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              Cats are very sensitive. Be careful with loud and sudden noises, which could scare
              them.
            </fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">Leave your pets at home. Other pets are not allowed here.</fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              We are not responsible for any injuries caused by our cats - they are very playful,
              and they do not mean it. Pay special attention to your kids. Feel free to ask for
              medical aid when needed.
            </fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">Hygiene is important. Wash your hand when playing with our cats.</fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              We highly discourage you from visiting us in case you are allergic to cats.
            </fbt>
          </li>
          <li className={styles('listItem')}>
            <fbt desc="rule">
              Please, follow our rules. Misbehaving guests will be asked to leave.
            </fbt>
          </li>
        </ol>
      </div>
    </div>
  );
}

const styles = sx.create({
  orderedListUpperRoman: {
    listStyleType: 'upper-roman',
  },
  listItem: {
    marginBlockEnd: 10,
  },
});
