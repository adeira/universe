type OperationAvailability = 'available' | 'stale' | 'missing';

interface LogEventQueryResourceFetch {
  readonly name: 'queryresource.fetch';
  readonly operation: unknown; // TODO
  // FetchPolicy from relay-experimental
  readonly fetchPolicy: string;
  // RenderPolicy from relay-experimental
  readonly renderPolicy: string;
  readonly queryAvailability: OperationAvailability;
  readonly shouldFetch: boolean;
}

interface LogEventExecuteInfo {
  readonly name: 'execute.info';
  readonly transactionID: number;
  readonly info: unknown;
}

interface LogEventExecuteStart {
  readonly name: 'execute.start';
  readonly transactionID: number;
  readonly params: {
    // RequestParameters type
    readonly name: string;
    readonly operationKind: string;
    readonly text: string;
  };
  readonly variables: object;
}

interface LogEventExecuteNext {
  readonly name: 'execute.next';
  readonly transactionID: number;
  readonly response: unknown;
}

interface LogEventExecuteError {
  readonly name: 'execute.error';
  readonly transactionID: number;
  readonly error: Error;
}

interface LogEventExecuteComplete {
  readonly name: 'execute.complete';
  readonly transactionID: number;
}

interface LogEventExecuteUnsubscribe {
  readonly name: 'execute.unsubscribe';
  readonly transactionID: number;
}

type TransactionalLogEvent =
  | LogEventExecuteInfo
  | LogEventExecuteStart
  | LogEventExecuteNext
  | LogEventExecuteError
  | LogEventExecuteComplete
  | LogEventExecuteUnsubscribe;

type LogEvent = LogEventQueryResourceFetch | TransactionalLogEvent;

export function RelayLogger(logEvent: LogEvent);
