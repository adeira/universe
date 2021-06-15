// @flow

/**
 * Deferred provides a Promise-like API that exposes methods to resolve and
 * reject the Promise.
 *
 * If you want to export the Promise without exposing access to the resolve and
 * reject methods, you should export `getPromise` which returns a Promise with
 * the same semantics excluding those methods.
 */
export default class Deferred<Tvalue, Treason> {
  _settled: boolean;
  _promise: Promise<any>;
  _resolve: (value: Tvalue) => void;
  _reject: (reason: Treason) => void;

  constructor() {
    this._settled = false;
    this._promise = new Promise((resolve, reject) => {
      this._resolve = (resolve: any);
      this._reject = (reject: any);
    });
  }

  getPromise(): Promise<any> {
    return this._promise;
  }

  resolve(value: Tvalue): void {
    this._settled = true;
    this._resolve(value);
  }

  reject(reason: Treason): void {
    this._settled = true;
    this._reject(reason);
  }

  catch(onReject?: ?(error: any) => mixed): Promise<any> {
    /* $FlowFixMe[method-unbinding] This comment suppresses an error when
     * upgrading Flow to version 0.153.0. To see the error delete this comment
     * and run Flow. */
    return Promise.prototype.catch.apply(this._promise, [onReject]);
  }

  then(onFulfill?: ?(value: any) => mixed, onReject?: ?(error: any) => mixed): Promise<any> {
    /* $FlowFixMe[method-unbinding] This comment suppresses an error when
     * upgrading Flow to version 0.153.0. To see the error delete this comment
     * and run Flow. */
    return Promise.prototype.then.apply(this._promise, [onFulfill, onReject]);
  }

  isSettled(): boolean {
    return this._settled;
  }
}
