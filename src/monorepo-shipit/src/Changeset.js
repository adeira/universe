// @flow strict

import { sprintf } from '@adeira/js';

type Diff = {|
  +path: string,
  +body: string,
|};

opaque type ChangesetData = {|
  +id: string,
  +timestamp: string,
  +author: string,
  +subject: string,
  +description: string,
  +diffs: Set<Diff>,
  +debugMessages: Array<string>,
|};

export default class Changeset {
  declare id: string;
  declare timestamp: string;
  declare author: string;
  declare subject: string;
  declare description: string;
  declare diffs: Set<Diff>;
  debugMessages: Array<string> = [];

  isValid(): boolean {
    return this.diffs.size > 0;
  }

  getID(): string {
    return this.id;
  }

  withID(id: string): Changeset {
    return this.__clone({ id });
  }

  getTimestamp(): string {
    return this.timestamp;
  }

  withTimestamp(timestamp: string): Changeset {
    return this.__clone({ timestamp });
  }

  getAuthor(): string {
    return this.author;
  }

  withAuthor(author: string): Changeset {
    return this.__clone({ author });
  }

  getSubject(): string {
    return this.subject;
  }

  withSubject(subject: string): Changeset {
    return this.__clone({ subject });
  }

  getDescription(): string {
    return this.description;
  }

  withDescription(description: string): Changeset {
    return this.__clone({ description });
  }

  getCommitMessage(): string {
    return `${this.getSubject()}\n\n${this.getDescription()}`;
  }

  getDiffs(): Set<Diff> {
    return this.diffs ?? new Set();
  }

  withDiffs(diffs: Set<Diff>): Changeset {
    return this.__clone({ diffs });
  }

  withDebugMessage(string: string, ...args: $ReadOnlyArray<string>): Changeset {
    const messages = this.debugMessages;
    return this.__clone({
      debugMessages: messages.concat(sprintf(string, ...args)),
    });
  }

  dumpDebugMessages(): void {
    console.log(sprintf('  DEBUG %s (%s)', this.getID(), this.getSubject()));
    for (const debugMessage of this.debugMessages) {
      console.log('    %s', debugMessage);
    }
  }

  __clone(newProps: { [$Keys<ChangesetData>]: $Values<ChangesetData>, ... }): Changeset {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this, newProps);
  }
}
