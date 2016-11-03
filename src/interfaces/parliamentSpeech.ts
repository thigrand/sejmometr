import {
  Dataobject,
  HttpResponse
} from './';

interface ParliamentSpeechRow {
  'ludzie.avatar': string;
  'ludzie.id': string;
  'ludzie.nazwa': string;
  'ludzie.posel_id': string;
  'sejm_debaty.id': string;
  'sejm_debaty.liczba_glosowan': number;
  'sejm_debaty.liczba_wystapien': number;
  'sejm_debaty.typ_id': string;
  'sejm_debaty.tytul': string;
  'sejm_wystapienia._ord': number;
  'sejm_wystapienia.czlowiek_id': string;
  'sejm_wystapienia.data': string;
  'sejm_wystapienia.debata_id': string;
  'sejm_wystapienia.dlugosc': number;
  'sejm_wystapienia.dzien_sejmowy_id': string;
  'sejm_wystapienia.glosowanie_id': string;
  'sejm_wystapienia.id': string;
  'sejm_wystapienia.ilosc_slow': string;
  'sejm_wystapienia.kadencja': string;
  'sejm_wystapienia.klub_id': string;
  'sejm_wystapienia.posiedzenie_id': string;
  'sejm_wystapienia.punkt_id': Array<string>;
  'sejm_wystapienia.skrot': string;
  'sejm_wystapienia.stanowisko_id': string;
  'sejm_wystapienia.tytul': string;
  'sejm_wystapienia.video': string;
  'sejm_wystapienia.yt_id': string;
  'sejm_wystapienia.yt_pl_id': string;
  'stanowiska.id': string;
  'stanowiska.nazwa': string;
}

export interface SingleParliamentSpeechHttpResponse extends Dataobject {
  data: ParliamentSpeechRow;
}

export interface ParliamentSpeechHttpResponse extends HttpResponse {
  Dataobject: Array<SingleParliamentSpeechHttpResponse>;
}
