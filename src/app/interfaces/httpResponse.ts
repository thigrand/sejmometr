import { Headers } from '@angular/http';

export interface ApiHttpResponse {
  Dataobject: any;
  Count: number;
  links: Array<string>;
  Took: number;
}

export interface HttpRequestOptions {
  queryObj?: Object;
  withCredentials?: boolean;
  mapFunctions?: {success: (e) => {}, fail: (e) => {}};
}

export interface MappedHttpResponse {
  response: any;
  status: number;
  type: number;
  myStatus: boolean;
  headers: Headers;
}
