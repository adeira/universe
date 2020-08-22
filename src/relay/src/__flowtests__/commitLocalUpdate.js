// @flow

import { commitLocalUpdate, createLocalEnvironment } from '../index';

const environment = createLocalEnvironment();

module.exports = {
  validLocalUpdate(): void {
    return commitLocalUpdate(environment, (store) => {
      const favorite = store.get('unique:ID');
      if (favorite) {
        favorite.setValue(false, 'isNew');
      }
    });
  },

  // Invalid usages:
  invalidUpdater(): void {
    return commitLocalUpdate(environment, (store) => {
      // $FlowExpectedError[prop-missing]: cannot call store.wtf because property wtf is missing in RecordSourceSelectorProxy
      store.wtf('ups');

      const record = store.get('unique:ID');
      if (record) {
        // $FlowExpectedError[prop-missing]: cannot call record.wtf because property wtf is missing in RecordProxy
        record.wtf('ups');
      }
    });
  },
};
