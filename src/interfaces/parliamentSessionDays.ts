import {
  Dataobject,
  HttpResponse
} from "./";

interface ParliamentSessionDayRow{
  'sejm_posiedzenia.id': string;
  'sejm_posiedzenia.tytul': string;
  'sejm_posiedzenia_dni.data': string;
  'sejm_posiedzenia_dni.dlugosc': number;
  'sejm_posiedzenia_dni.dokument_id': string;
  'sejm_posiedzenia_dni.id': string;
  'sejm_posiedzenia_dni.kadencja': string;
  'sejm_posiedzenia_dni.liczba_glosowan': number;
  'sejm_posiedzenia_dni.liczba_wystapien': number;
  'sejm_posiedzenia_dni.posiedzenie_id': string;
  'sejm_posiedzenia_dni.tytul': string;
}

export interface SingleParliamentSessionsDayHttpResponse extends Dataobject{
  data: ParliamentSessionDayRow;
}

export interface ParliamentSessionsDaysHttpResponse extends HttpResponse{
  Dataobject: Array<SingleParliamentSessionsDayHttpResponse>;
}
