declare module 'soap' {
  declare type SoapOptions = $ReadOnly<{|
    +attributesKey?: string,
    +disableCache?: boolean,
    +endpoint?: string,
    +envelopeKey?: string,
    +escapeXML?: boolean,
    +forceSoap12Headers?: boolean,
    +httpClient?: any,
    +namespaceArrayElements?: boolean,
    +normalizeNames?: boolean,
    +overridePromiseSuffix?: string,
    +preserveWhitespace?: boolean,
    +request?: any,
    +returnFault?: boolean,
    +suppressStack?: boolean,
    +wsdl_headers?: { ... },
    +wsdl_options?: { ... },
  |}>;

  declare type RawResponse = string;
  declare type SoapHeader = { +[key: string]: any, ... };
  declare type RawRequest = string;
  declare type MapResponse = <Request, Response>(
    (Request) => Response,
  ) => Request => Promise<[Response, RawResponse, SoapHeader, RawRequest]>;
  declare export type SoapClient<SoapMethods> = $ReadOnly<{|
    describe(): { +[key: string]: any, ... },
    setEndpoint(url: string): void,
    lastRequest: string,
    ...$ObjMap<SoapMethods, MapResponse>,
  |}>;

  declare type Soap = $ReadOnly<{|
    createClientAsync<SoapClient>(url: string, options?: SoapOptions): Promise<SoapClient>,
  |}>;

  declare export default Soap;
}
