// @flow strict

declare module 'faunadb' {
  declare export default {|
    Client: typeof Client,
    Expr: typeof Expr,
    PageHelper: typeof PageHelper,
    RequestResult: typeof RequestResult,
  |};

  declare class Expr {
    constructor(obj: {| [key: string]: any |}): this;
    +_isFaunaExpr?: boolean;
    static toString(expr: Expr): string;
  }

  declare export var values: typeof npm$namespace$values;

  declare var npm$namespace$values: {|
    Value: typeof values$Value,
    Ref: typeof values$Ref,
    Native: typeof values$Native,
    SetRef: typeof values$SetRef,
    FaunaTime: typeof values$FaunaTime,
    FaunaDate: typeof values$FaunaDate,
    Bytes: typeof values$Bytes,
    Query: typeof values$Query,
  |};

  declare export class values$Value mixins Expr {
    toJSON(): {| [key: string]: any |};
    inspect(): string;
    +_isFaunaValue?: boolean;
  }

  declare export class values$Ref mixins values$Value {
    constructor(id: string, col?: values$Ref, db?: values$Ref): this;
    id: string;
    collection?: values$Ref;
    class?: values$Ref;
    database?: values$Ref;
  }

  declare export class values$Native {
    static +COLLECTIONS: values$Ref;
    static +INDEXES: values$Ref;
    static +DATABASES: values$Ref;
    static +KEYS: values$Ref;
    static +FUNCTIONS: values$Ref;
  }

  declare export class values$SetRef mixins values$Value {
    constructor(value: string): this;
  }

  declare export class values$FaunaTime mixins values$Value {
    constructor(value: string): this;
    constructor(value: Date): this;
    date: Date;
  }

  declare export class values$FaunaDate mixins values$Value {
    constructor(value: string): this;
    constructor(value: Date): this;
    date: Date;
  }

  declare export class values$Bytes mixins values$Value {
    constructor(value: string): this;
    constructor(value: ArrayBuffer): this;
    constructor(value: Uint8Array): this;
  }

  declare export class values$Query mixins values$Value {
    constructor(value: {| [key: string]: any |}): this;
  }

  declare export type values$Document<T = {| [key: string]: any |}> = {
    ref: values$Ref,
    ts: number,
    data: T,
    ...
  };

  declare export type values$Page<T> = {
    data: T[],
    after?: Expr,
    before?: Expr,
    ...
  };

  declare export class RequestResult {
    constructor(
      method: string,
      path: string,
      query: {| [key: string]: any |},
      requestRaw: string,
      requestContent: {| [key: string]: any |},
      responseRaw: string,
      responseContent: {| [key: string]: any |},
      statusCode: number,
      responseHeaders: {| [key: string]: any |},
      startTime: Date,
      endTime: Date,
    ): this;
    +method: string;
    +path: string;
    +query: {| [key: string]: any |};
    +requestRaw: string;
    +requestContent: {| [key: string]: any |};
    +responseRaw: string;
    +responseContent: {| [key: string]: any |};
    +statusCode: number;
    +responseHeaders: {| [key: string]: any |};
    +startTime: Date;
    +endTime: Date;
    +timeTaken: number;
  }

  declare var errors: typeof npm$namespace$errors;

  declare var npm$namespace$errors: {|
    FaunaError: typeof errors$FaunaError,
    InvalidValue: typeof errors$InvalidValue,
    FaunaHTTPError: typeof errors$FaunaHTTPError,
    BadRequest: typeof errors$BadRequest,
    Unauthorized: typeof errors$Unauthorized,
    PermissionDenied: typeof errors$PermissionDenied,
    NotFound: typeof errors$NotFound,
    MethodNotAllowed: typeof errors$MethodNotAllowed,
    InternalError: typeof errors$InternalError,
    UnavailableError: typeof errors$UnavailableError,
  |};
  declare export class errors$FaunaError mixins Error {
    constructor(message: string): this;
    name: string;
    message: string;
  }

  declare export class errors$InvalidValue mixins errors$FaunaError {}

  declare export class errors$FaunaHTTPError mixins errors$FaunaError {
    static raiseForStatusCode(requestResult: RequestResult): void;
    constructor(name: string, requestResult: RequestResult): this;
    requestResult: RequestResult;
    errors(): {| [key: string]: any |};
  }

  declare export class errors$BadRequest mixins errors$FaunaHTTPError {}

  declare export class errors$Unauthorized mixins errors$FaunaHTTPError {}

  declare export class errors$PermissionDenied mixins errors$FaunaHTTPError {}

  declare export class errors$NotFound mixins errors$FaunaHTTPError {}

  declare export class errors$MethodNotAllowed mixins errors$FaunaHTTPError {}

  declare export class errors$InternalError mixins errors$FaunaHTTPError {}

  declare export class errors$UnavailableError mixins errors$FaunaHTTPError {}

  declare export class PageHelper {
    constructor(
      client: Client,
      set: Expr,
      params?: {| [key: string]: any |},
      options?: QueryOptions,
    ): this;
    map(lambda: Lambda): PageHelper;
    filter(lambda: Lambda): PageHelper;
    each(lambda: (page: {| [key: string]: any |}) => void): Promise<void>;
    eachReverse(lambda: (page: {| [key: string]: any |}) => void): Promise<void>;
    previousPage(): Promise<{| [key: string]: any |}>;
    nextPage(): Promise<{| [key: string]: any |}>;
  }

  declare export interface ClientConfig {
    secret: string;
    domain?: string;
    scheme?: 'http' | 'https';
    port?: number;
    timeout?: number;
    observer?: (res: RequestResult, client: Client) => void;
    keepAlive?: boolean;
    headers?: {
      [key: string]: string | number,
      ...
    };
    fetch?: typeof fetch;
  }

  declare export interface QueryOptions {
    secret?: string;
  }

  declare export class Client {
    constructor(opts?: ClientConfig): this;
    query<T>(expr: Expr, options?: QueryOptions): Promise<T>;
    paginate(expr: Expr, params?: {| [key: string]: any |}, options?: QueryOptions): PageHelper;
    ping(scope?: string, timeout?: number): Promise<string>;
  }

  declare type ExprVal =
    | Expr
    | string
    | number
    | boolean
    | {
        [key: string]: any,
        ...
      };
  declare type ExprArg = ExprVal | Array<ExprVal>;
  declare export type Lambda = (...vars: any[]) => Expr;
  declare export var query: typeof npm$namespace$query;

  declare var npm$namespace$query: {|
    Ref: typeof query$Ref,
    Bytes: typeof query$Bytes,
    Abort: typeof query$Abort,
    At: typeof query$At,
    Let: typeof query$Let,
    Var: typeof query$Var,
    If: typeof query$If,
    Do: typeof query$Do,
    Object: typeof query$Object,
    Lambda: typeof query$Lambda,
    Call: typeof query$Call,
    Query: typeof query$Query,
    Map: typeof query$Map,
    Merge: typeof query$Merge,
    Foreach: typeof query$Foreach,
    Filter: typeof query$Filter,
    Take: typeof query$Take,
    Drop: typeof query$Drop,
    Prepend: typeof query$Prepend,
    Append: typeof query$Append,
    IsEmpty: typeof query$IsEmpty,
    IsNonEmpty: typeof query$IsNonEmpty,
    IsNumber: typeof query$IsNumber,
    IsDouble: typeof query$IsDouble,
    IsInteger: typeof query$IsInteger,
    IsBoolean: typeof query$IsBoolean,
    IsNull: typeof query$IsNull,
    IsBytes: typeof query$IsBytes,
    IsTimestamp: typeof query$IsTimestamp,
    IsDate: typeof query$IsDate,
    IsString: typeof query$IsString,
    IsArray: typeof query$IsArray,
    IsObject: typeof query$IsObject,
    IsRef: typeof query$IsRef,
    IsSet: typeof query$IsSet,
    IsDoc: typeof query$IsDoc,
    IsLambda: typeof query$IsLambda,
    IsCollection: typeof query$IsCollection,
    IsDatabase: typeof query$IsDatabase,
    IsIndex: typeof query$IsIndex,
    IsFunction: typeof query$IsFunction,
    IsKey: typeof query$IsKey,
    IsToken: typeof query$IsToken,
    IsCredentials: typeof query$IsCredentials,
    IsRole: typeof query$IsRole,
    Get: typeof query$Get,
    KeyFromSecret: typeof query$KeyFromSecret,
    Reduce: typeof query$Reduce,
    Paginate: typeof query$Paginate,
    Exists: typeof query$Exists,
    Create: typeof query$Create,
    Update: typeof query$Update,
    Replace: typeof query$Replace,
    Delete: typeof query$Delete,
    Insert: typeof query$Insert,
    Remove: typeof query$Remove,
    CreateClass: typeof query$CreateClass,
    CreateCollection: typeof query$CreateCollection,
    CreateDatabase: typeof query$CreateDatabase,
    CreateIndex: typeof query$CreateIndex,
    CreateKey: typeof query$CreateKey,
    CreateFunction: typeof query$CreateFunction,
    CreateRole: typeof query$CreateRole,
    Singleton: typeof query$Singleton,
    Events: typeof query$Events,
    Match: typeof query$Match,
    Union: typeof query$Union,
    Intersection: typeof query$Intersection,
    Difference: typeof query$Difference,
    Distinct: typeof query$Distinct,
    Join: typeof query$Join,
    Range: typeof query$Range,
    Login: typeof query$Login,
    Logout: typeof query$Logout,
    Identify: typeof query$Identify,
    Identity: typeof query$Identity,
    HasIdentity: typeof query$HasIdentity,
    Concat: typeof query$Concat,
    Casefold: typeof query$Casefold,
    ContainsStr: typeof query$ContainsStr,
    ContainsStrRegex: typeof query$ContainsStrRegex,
    StartsWith: typeof query$StartsWith,
    EndsWith: typeof query$EndsWith,
    RegexEscape: typeof query$RegexEscape,
    FindStr: typeof query$FindStr,
    FindStrRegex: typeof query$FindStrRegex,
    Length: typeof query$Length,
    LowerCase: typeof query$LowerCase,
    LTrim: typeof query$LTrim,
    NGram: typeof query$NGram,
    Repeat: typeof query$Repeat,
    ReplaceStr: typeof query$ReplaceStr,
    ReplaceStrRegex: typeof query$ReplaceStrRegex,
    RTrim: typeof query$RTrim,
    Space: typeof query$Space,
    SubString: typeof query$SubString,
    TitleCase: typeof query$TitleCase,
    Trim: typeof query$Trim,
    UpperCase: typeof query$UpperCase,
    Format: typeof query$Format,
    Time: typeof query$Time,
    Epoch: typeof query$Epoch,
    TimeAdd: typeof query$TimeAdd,
    TimeSubtract: typeof query$TimeSubtract,
    TimeDiff: typeof query$TimeDiff,
    Date: typeof query$Date,
    Now: typeof query$Now,
    DayOfWeek: typeof query$DayOfWeek,
    DayOfYear: typeof query$DayOfYear,
    DayOfMonth: typeof query$DayOfMonth,
    Hour: typeof query$Hour,
    Minute: typeof query$Minute,
    Second: typeof query$Second,
    Year: typeof query$Year,
    Month: typeof query$Month,
    NextId: typeof query$NextId,
    NewId: typeof query$NewId,
    Database: typeof query$Database,
    Index: typeof query$Index,
    Class: typeof query$Class,
    Collection: typeof query$Collection,
    Function: typeof query$Function,
    Role: typeof query$Role,
    Databases: typeof query$Databases,
    Classes: typeof query$Classes,
    Collections: typeof query$Collections,
    Indexes: typeof query$Indexes,
    Functions: typeof query$Functions,
    Roles: typeof query$Roles,
    Keys: typeof query$Keys,
    Tokens: typeof query$Tokens,
    Credentials: typeof query$Credentials,
    Equals: typeof query$Equals,
    Contains: typeof query$Contains,
    Select: typeof query$Select,
    SelectAll: typeof query$SelectAll,
    Abs: typeof query$Abs,
    Add: typeof query$Add,
    BitAnd: typeof query$BitAnd,
    BitNot: typeof query$BitNot,
    BitOr: typeof query$BitOr,
    BitXor: typeof query$BitXor,
    Ceil: typeof query$Ceil,
    Divide: typeof query$Divide,
    Floor: typeof query$Floor,
    Max: typeof query$Max,
    Min: typeof query$Min,
    Modulo: typeof query$Modulo,
    Multiply: typeof query$Multiply,
    Round: typeof query$Round,
    Subtract: typeof query$Subtract,
    Sign: typeof query$Sign,
    Sqrt: typeof query$Sqrt,
    Trunc: typeof query$Trunc,
    Count: typeof query$Count,
    Sum: typeof query$Sum,
    Mean: typeof query$Mean,
    Any: typeof query$Any,
    All: typeof query$All,
    Acos: typeof query$Acos,
    Asin: typeof query$Asin,
    Atan: typeof query$Atan,
    Cos: typeof query$Cos,
    Cosh: typeof query$Cosh,
    Degrees: typeof query$Degrees,
    Exp: typeof query$Exp,
    Hypot: typeof query$Hypot,
    Ln: typeof query$Ln,
    Log: typeof query$Log,
    Pow: typeof query$Pow,
    Radians: typeof query$Radians,
    Sin: typeof query$Sin,
    Sinh: typeof query$Sinh,
    Tan: typeof query$Tan,
    Tanh: typeof query$Tanh,
    LT: typeof query$LT,
    LTE: typeof query$LTE,
    GT: typeof query$GT,
    GTE: typeof query$GTE,
    And: typeof query$And,
    Or: typeof query$Or,
    Not: typeof query$Not,
    ToString: typeof query$ToString,
    ToNumber: typeof query$ToNumber,
    ToObject: typeof query$ToObject,
    ToArray: typeof query$ToArray,
    ToDouble: typeof query$ToDouble,
    ToInteger: typeof query$ToInteger,
    ToTime: typeof query$ToTime,
    ToDate: typeof query$ToDate,
    ToSeconds: typeof query$ToSeconds,
    ToMillis: typeof query$ToMillis,
    ToMicros: typeof query$ToMicros,
    MoveDatabase: typeof query$MoveDatabase,
    Documents: typeof query$Documents,
  |};
  declare export function query$Ref(ref: ExprArg, id?: ExprArg): Expr;

  declare export function query$Bytes(bytes: ExprArg | ArrayBuffer | Uint8Array): Expr;

  declare export function query$Abort(msg: ExprArg): Expr;

  declare export function query$At(timestamp: ExprArg, expr: ExprArg): Expr;

  declare export function query$Let(vars: ExprArg, in_expr: ExprArg): Expr;

  declare export function query$Var(varName: ExprArg): Expr;

  declare export function query$If(
    condition: ExprArg,
    then: ExprArg | null,
    _else: ExprArg | null,
  ): Expr;

  declare export function query$Do(...args: ExprArg[]): Expr;

  declare export function query$Object(fields: ExprArg): Expr;

  // $FlowFixMe[incompatible-type]
  declare export function query$Lambda(f: query$Lambda): Expr;

  declare export function query$Lambda(var_name: ExprArg, expr: ExprArg): Expr;

  declare export function query$Call(ref: ExprArg, ...args: ExprArg[]): Expr;

  // $FlowFixMe[incompatible-type]
  declare export function query$Query(lambda: ExprArg | query$Lambda): Expr;

  // $FlowFixMe[incompatible-type]
  declare export function query$Map(collection: ExprArg, lambda_expr: ExprArg | query$Lambda): Expr;

  declare export function query$Merge(
    object: ExprArg,
    values: ExprArg,
    // $FlowFixMe[incompatible-type]
    resolver?: Expr | query$Lambda,
  ): Expr;

  declare export function query$Foreach(
    collection: ExprArg,
    // $FlowFixMe[incompatible-type]
    lambda_expr: ExprArg | query$Lambda,
  ): Expr;

  declare export function query$Filter(
    collection: ExprArg,
    // $FlowFixMe[incompatible-type]
    lambda_expr: ExprArg | query$Lambda,
  ): Expr;

  declare export function query$Take(number: ExprArg, collection: ExprArg): Expr;

  declare export function query$Drop(number: ExprArg, collection: ExprArg): Expr;

  declare export function query$Prepend(elements: ExprArg, collection: ExprArg): Expr;

  declare export function query$Append(elements: ExprArg, collection: ExprArg): Expr;

  declare export function query$IsEmpty(collection: ExprArg): Expr;

  declare export function query$IsNonEmpty(collection: ExprArg): Expr;

  declare export function query$IsNumber(expr: ExprArg): Expr;

  declare export function query$IsDouble(expr: ExprArg): Expr;

  declare export function query$IsInteger(expr: ExprArg): Expr;

  declare export function query$IsBoolean(expr: ExprArg): Expr;

  declare export function query$IsNull(expr: ExprArg): Expr;

  declare export function query$IsBytes(expr: ExprArg): Expr;

  declare export function query$IsTimestamp(expr: ExprArg): Expr;

  declare export function query$IsDate(expr: ExprArg): Expr;

  declare export function query$IsString(expr: ExprArg): Expr;

  declare export function query$IsArray(expr: ExprArg): Expr;

  declare export function query$IsObject(expr: ExprArg): Expr;

  declare export function query$IsRef(expr: ExprArg): Expr;

  declare export function query$IsSet(expr: ExprArg): Expr;

  declare export function query$IsDoc(expr: ExprArg): Expr;

  declare export function query$IsLambda(expr: ExprArg): Expr;

  declare export function query$IsCollection(expr: ExprArg): Expr;

  declare export function query$IsDatabase(expr: ExprArg): Expr;

  declare export function query$IsIndex(expr: ExprArg): Expr;

  declare export function query$IsFunction(expr: ExprArg): Expr;

  declare export function query$IsKey(expr: ExprArg): Expr;

  declare export function query$IsToken(expr: ExprArg): Expr;

  declare export function query$IsCredentials(expr: ExprArg): Expr;

  declare export function query$IsRole(expr: ExprArg): Expr;

  declare export function query$Get(ref: ExprArg, ts?: ExprArg): Expr;

  declare export function query$KeyFromSecret(secret: ExprArg): Expr;

  declare export function query$Reduce(
    lambda: ExprArg,
    initial: ExprArg,
    collection: ExprArg,
  ): Expr;

  declare export function query$Paginate(set: ExprArg, opts?: {| [key: string]: any |}): Expr;

  declare export function query$Exists(ref: ExprArg, ts?: ExprArg): Expr;

  declare export function query$Create(collection_ref: ExprArg, params?: ExprArg): Expr;

  declare export function query$Update(ref: ExprArg, params: ExprArg): Expr;

  declare export function query$Replace(ref: ExprArg, params: ExprArg): Expr;

  declare export function query$Delete(ref: ExprArg): Expr;

  declare export function query$Insert(
    ref: ExprArg,
    ts: ExprArg,
    action: ExprArg,
    params: ExprArg,
  ): Expr;

  declare export function query$Remove(ref: ExprArg, ts: ExprArg, action: ExprArg): Expr;

  declare export function query$CreateClass(params: ExprArg): Expr;

  declare export function query$CreateCollection(params: ExprArg): Expr;

  declare export function query$CreateDatabase(params: ExprArg): Expr;

  declare export function query$CreateIndex(params: ExprArg): Expr;

  declare export function query$CreateKey(params: ExprArg): Expr;

  declare export function query$CreateFunction(params: ExprArg): Expr;

  declare export function query$CreateRole(params: ExprArg): Expr;

  declare export function query$Singleton(ref: ExprArg): Expr;

  declare export function query$Events(ref_set: ExprArg): Expr;

  declare export function query$Match(index: ExprArg, ...terms: ExprArg[]): Expr;

  declare export function query$Union(...sets: ExprArg[]): Expr;

  declare export function query$Intersection(...sets: ExprArg[]): Expr;

  declare export function query$Difference(...sets: ExprArg[]): Expr;

  declare export function query$Distinct(set: ExprArg): Expr;

  // $FlowFixMe[incompatible-type]
  declare export function query$Join(source: ExprArg, target: ExprArg | query$Lambda): Expr;

  declare export function query$Range(set: ExprArg, from: ExprArg, to: ExprArg): Expr;

  declare export function query$Login(ref: ExprArg, params: ExprArg): Expr;

  declare export function query$Logout(delete_tokens: ExprArg): Expr;

  declare export function query$Identify(ref: ExprArg, password: ExprArg): Expr;

  declare export function query$Identity(): Expr;

  declare export function query$HasIdentity(): Expr;

  declare export function query$Concat(strings: ExprArg, separator?: ExprArg): Expr;

  declare export function query$Casefold(string: ExprArg, normalizer?: ExprArg): Expr;

  declare export function query$ContainsStr(value: ExprArg, search: ExprArg): Expr;

  declare export function query$ContainsStrRegex(value: ExprArg, pattern: ExprArg): Expr;

  declare export function query$StartsWith(value: ExprArg, search: ExprArg): Expr;

  declare export function query$EndsWith(value: ExprArg, search: ExprArg): Expr;

  declare export function query$RegexEscape(value: ExprArg): Expr;

  declare export function query$FindStr(value: ExprArg, find: ExprArg, start?: ExprArg): Expr;

  declare export function query$FindStrRegex(
    value: ExprArg,
    find: ExprArg,
    start?: ExprArg,
    numResults?: ExprArg,
  ): Expr;

  declare export function query$Length(expr: ExprArg): Expr;

  declare export function query$LowerCase(expr: ExprArg): Expr;

  declare export function query$LTrim(expr: ExprArg): Expr;

  declare export function query$NGram(terms: ExprArg, min?: ExprArg, max?: ExprArg): Expr;

  declare export function query$Repeat(expr: ExprArg, number?: ExprArg): Expr;

  declare export function query$ReplaceStr(expr: ExprArg, find: ExprArg, replace: ExprArg): Expr;

  declare export function query$ReplaceStrRegex(
    expr: ExprArg,
    find: ExprArg,
    replace: ExprArg,
    first?: ExprArg,
  ): Expr;

  declare export function query$RTrim(expr: ExprArg): Expr;

  declare export function query$Space(expr: ExprArg): Expr;

  declare export function query$SubString(expr: ExprArg, start?: ExprArg, length?: ExprArg): Expr;

  declare export function query$TitleCase(value: ExprArg): Expr;

  declare export function query$Trim(expr: ExprArg): Expr;

  declare export function query$UpperCase(expr: ExprArg): Expr;

  declare export function query$Format(string: ExprArg, values: ExprArg): Expr;

  declare export function query$Time(string: ExprArg): Expr;

  declare export function query$Epoch(number: ExprArg, unit: ExprArg): Expr;

  declare export function query$TimeAdd(base: ExprArg, offset: ExprArg, unit: ExprArg): Expr;

  declare export function query$TimeSubtract(base: ExprArg, offset: ExprArg, unit: ExprArg): Expr;

  declare export function query$TimeDiff(start: ExprArg, finish: ExprArg, unit: ExprArg): Expr;

  declare export function query$Date(string: ExprArg): Expr;

  declare export function query$Now(): Expr;

  declare export function query$DayOfWeek(expr: ExprArg): Expr;

  declare export function query$DayOfYear(expr: ExprArg): Expr;

  declare export function query$DayOfMonth(expr: ExprArg): Expr;

  declare export function query$Hour(expr: ExprArg): Expr;

  declare export function query$Minute(expr: ExprArg): Expr;

  declare export function query$Second(expr: ExprArg): Expr;

  declare export function query$Year(expr: ExprArg): Expr;

  declare export function query$Month(expr: ExprArg): Expr;

  declare export function query$NextId(): Expr;

  declare export function query$NewId(): Expr;

  declare export function query$Database(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Index(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Class(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Collection(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Function(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Role(name: ExprArg, scope?: ExprArg): Expr;

  declare export function query$Databases(scope?: ExprArg): Expr;

  declare export function query$Classes(scope?: ExprArg): Expr;

  declare export function query$Collections(scope?: ExprArg): Expr;

  declare export function query$Indexes(scope?: ExprArg): Expr;

  declare export function query$Functions(scope?: ExprArg): Expr;

  declare export function query$Roles(scope?: ExprArg): Expr;

  declare export function query$Keys(scope?: ExprArg): Expr;

  declare export function query$Tokens(scope?: ExprArg): Expr;

  declare export function query$Credentials(scope?: ExprArg): Expr;

  declare export function query$Equals(...args: ExprArg[]): Expr;

  declare export function query$Contains(path: ExprArg, _in: ExprArg): Expr;

  declare export function query$Select(path: ExprArg, from: ExprArg, _default?: ExprArg): Expr;

  declare export function query$SelectAll(path: ExprArg, from: ExprArg): Expr;

  declare export function query$Abs(expr: ExprArg): Expr;

  declare export function query$Add(...args: ExprArg[]): Expr;

  declare export function query$BitAnd(...args: ExprArg[]): Expr;

  declare export function query$BitNot(expr: ExprArg): Expr;

  declare export function query$BitOr(...args: ExprArg[]): Expr;

  declare export function query$BitXor(...args: ExprArg[]): Expr;

  declare export function query$Ceil(expr: ExprArg): Expr;

  declare export function query$Divide(...args: ExprArg[]): Expr;

  declare export function query$Floor(expr: ExprArg): Expr;

  declare export function query$Max(...args: ExprArg[]): Expr;

  declare export function query$Min(...args: ExprArg[]): Expr;

  declare export function query$Modulo(...args: ExprArg[]): Expr;

  declare export function query$Multiply(...args: ExprArg[]): Expr;

  declare export function query$Round(value: ExprArg, precision?: ExprArg): Expr;

  declare export function query$Subtract(...args: ExprArg[]): Expr;

  declare export function query$Sign(expr: ExprArg): Expr;

  declare export function query$Sqrt(expr: ExprArg): Expr;

  declare export function query$Trunc(value: ExprArg, precision?: ExprArg): Expr;

  declare export function query$Count(expr: ExprArg): Expr;

  declare export function query$Sum(expr: ExprArg): Expr;

  declare export function query$Mean(expr: ExprArg): Expr;

  declare export function query$Any(expr: ExprArg): Expr;

  declare export function query$All(expr: ExprArg): Expr;

  declare export function query$Acos(expr: ExprArg): Expr;

  declare export function query$Asin(expr: ExprArg): Expr;

  declare export function query$Atan(expr: ExprArg): Expr;

  declare export function query$Cos(expr: ExprArg): Expr;

  declare export function query$Cosh(expr: ExprArg): Expr;

  declare export function query$Degrees(expr: ExprArg): Expr;

  declare export function query$Exp(expr: ExprArg): Expr;

  declare export function query$Hypot(value: ExprArg, exp?: ExprArg): Expr;

  declare export function query$Ln(expr: ExprArg): Expr;

  declare export function query$Log(expr: ExprArg): Expr;

  declare export function query$Pow(value: ExprArg, exp?: ExprArg): Expr;

  declare export function query$Radians(expr: ExprArg): Expr;

  declare export function query$Sin(expr: ExprArg): Expr;

  declare export function query$Sinh(expr: ExprArg): Expr;

  declare export function query$Tan(expr: ExprArg): Expr;

  declare export function query$Tanh(expr: ExprArg): Expr;

  declare export function query$LT(...args: ExprArg[]): Expr;

  declare export function query$LTE(...args: ExprArg[]): Expr;

  declare export function query$GT(...args: ExprArg[]): Expr;

  declare export function query$GTE(...args: ExprArg[]): Expr;

  declare export function query$And(...args: ExprArg[]): Expr;

  declare export function query$Or(...args: ExprArg[]): Expr;

  declare export function query$Not(bool: ExprArg): Expr;

  declare export function query$ToString(expr: ExprArg): Expr;

  declare export function query$ToNumber(expr: ExprArg): Expr;

  declare export function query$ToObject(expr: ExprArg): Expr;

  declare export function query$ToArray(expr: ExprArg): Expr;

  declare export function query$ToDouble(expr: ExprArg): Expr;

  declare export function query$ToInteger(expr: ExprArg): Expr;

  declare export function query$ToTime(expr: ExprArg): Expr;

  declare export function query$ToDate(expr: ExprArg): Expr;

  declare export function query$ToSeconds(expr: ExprArg): Expr;

  declare export function query$ToMillis(expr: ExprArg): Expr;

  declare export function query$ToMicros(expr: ExprArg): Expr;

  declare export function query$MoveDatabase(from: ExprArg, to: ExprArg): Expr;

  declare export function query$Documents(collection: ExprArg): Expr;
}
