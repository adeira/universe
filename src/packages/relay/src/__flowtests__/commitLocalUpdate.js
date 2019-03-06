// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { commitLocalUpdate } from '../index';

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

module.exports = {
  validLocalUpdate() {
    return commitLocalUpdate(environment, store => {
      const favorite = store.get('unique:ID');
      if (favorite) {
        favorite.setValue(false, 'isNew');
      }
    });
  },

  // Invalid usages:
  invalidUpdater() {
    return commitLocalUpdate(environment, store => {
      // $FlowExpectedError: cannot call store.wtf because property wtf is missing in RecordSourceSelectorProxy
      store.wtf('ups');

      const record = store.get('unique:ID');
      if (record) {
        // $FlowExpectedError: cannot call record.wtf because property wtf is missing in RecordProxy
        record.wtf('ups');
      }
    });
  },
};
