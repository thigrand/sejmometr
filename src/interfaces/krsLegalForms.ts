import {
  Dataobject,
  HttpResponse
} from "./";

interface KrsLegalFormRow{
  'krs_formy_prawne.id': string;
  'krs_formy_prawne.nazwa': string;
  'krs_formy_prawne.typ_id': string;
}

export interface KrsLegalForms extends Dataobject{
  data: KrsLegalFormRow;
}

export interface KrsLegalFormsHttpResponse extends HttpResponse{
  Dataobject: Array<KrsLegalForms>;
}
