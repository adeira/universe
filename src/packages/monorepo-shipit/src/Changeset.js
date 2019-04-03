// @flow

type Diff = {|
  +path: string,
  +body: string,
|};

opaque type ChangesetData = {|
  +id: string,
  +timestamp: number,
  +author: string,
  +subject: string,
  +message: string,
  +diffs: Set<Diff>,
|};

export default class Changeset {
  id: string;
  message: string;
  diffs: Set<Diff>;

  // TODO: change the order (?)
  constructor(id: string, diffs: Set<Diff>, message: string) {
    this.id = id;
    this.message = message;
    this.diffs = diffs;
  }

  getID = () => {
    return this.id;
  };

  getMessage = () => {
    return this.message;
  };

  withMessage = (message: string): Changeset => {
    return new Changeset(this.id, this.diffs, message);
  };
}
