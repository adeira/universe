// @flow strict

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
|};

export default class Changeset {
  id: string;
  timestamp: string;
  author: string;
  subject: string;
  description: string;
  diffs: Set<Diff>;

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

  __clone(newProps: { [$Keys<ChangesetData>]: $Values<ChangesetData>, ... }): Changeset {
    return Object.assign(
      Object.create(this),
      {
        id: this.id,
        timestamp: this.timestamp,
        author: this.author,
        subject: this.subject,
        description: this.description,
        diffs: this.diffs,
      },
      newProps,
    );
  }
}
