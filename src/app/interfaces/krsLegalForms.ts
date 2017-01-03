import {
  Dataobject,
  ApiHttpResponse,
  MappedHttpResponse
} from './';

export interface KrsLegalFormRow {
  'krs_formy_prawne.id': string;
  'krs_formy_prawne.nazwa': string;
  'krs_formy_prawne.typ_id': string;
}

export interface KrsLegalForms extends Dataobject {
  data: KrsLegalFormRow;
}

export interface KrsLegalFormsApiHttpResponse extends ApiHttpResponse {
  Dataobject: Array<KrsLegalForms>;
}

export interface KrsLegalFormsHttpResponse extends MappedHttpResponse {
  response: KrsLegalFormsApiHttpResponse;
}
