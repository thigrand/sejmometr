import {
  Dataobject,
  HttpResponse
} from './';

interface ParliamentSessionRow {
  'sejm_posiedzenia.data_start': string;
  'sejm_posiedzenia.data_stop': string;
  'sejm_posiedzenia.id': string;
  'sejm_posiedzenia.img': string;
  'sejm_posiedzenia.informacja_marszalka_id': string;
  'sejm_posiedzenia.kadencja': string;
  'sejm_posiedzenia.komunikat_id': string;
  'sejm_posiedzenia.liczba_glosowan': number;
  'sejm_posiedzenia.liczba_odrzuconych_inne': number;
  'sejm_posiedzenia.liczba_odrzuconych_powolan_odwolan': number;
  'sejm_posiedzenia.liczba_odrzuconych_referendow': number;
  'sejm_posiedzenia.liczba_odrzuconych_sprawozdan_kontrolnych': number;
  'sejm_posiedzenia.liczba_odrzuconych_uchwal': number;
  'sejm_posiedzenia.liczba_odrzuconych_umow': number;
  'sejm_posiedzenia.liczba_odrzuconych_ustaw': number;
  'sejm_posiedzenia.liczba_odrzuconych_zmian_komisji': number;
  'sejm_posiedzenia.liczba_poprawki_senatu': number;
  'sejm_posiedzenia.liczba_przyjetych_inne': number;
  'sejm_posiedzenia.liczba_przyjetych_powolan_odwolan': number;
  'sejm_posiedzenia.liczba_przyjetych_referendow': number;
  'sejm_posiedzenia.liczba_przyjetych_sprawozdan_kontrolnych': number;
  'sejm_posiedzenia.liczba_przyjetych_uchwal': number;
  'sejm_posiedzenia.liczba_przyjetych_ustaw': number;
  'sejm_posiedzenia.liczba_przyjetych_zmian_komisji': number;
  'sejm_posiedzenia.liczba_punktow': number;
  'sejm_posiedzenia.liczba_ratyfikowanych_umow': number;
  'sejm_posiedzenia.liczba_skierowanych_inne': number;
  'sejm_posiedzenia.liczba_skierowanych_powolan_odwolan': number;
  'sejm_posiedzenia.liczba_skierowanych_referendow': number;
  'sejm_posiedzenia.liczba_skierowanych_sprawozdan_kontrolnych': number;
  'sejm_posiedzenia.liczba_skierowanych_uchwal': number;
  'sejm_posiedzenia.liczba_skierowanych_umow': number;
  'sejm_posiedzenia.liczba_skierowanych_ustaw': number;
  'sejm_posiedzenia.liczba_skierowanych_zmian_komisji': number;
  'sejm_posiedzenia.liczba_wystapien': number;
  'sejm_posiedzenia.numer': number;
  'sejm_posiedzenia.opis': string;
  'sejm_posiedzenia.stats': string;
  'sejm_posiedzenia.str_data': string;
  'sejm_posiedzenia.tytul': string;
  'sejm_posiedzenia.zapowiedz': string;
}

export interface SingleParliamentSessionHttpResponse extends Dataobject {
  data: ParliamentSessionRow;
}

export interface ParliamentSessionHttpResponse extends HttpResponse {
  Dataobject: Array<SingleParliamentSessionHttpResponse>;
}
