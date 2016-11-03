import {
  Dataobject,
  HttpResponse,
  KrsLayers
} from './';

/*
  krs_podmioty.forma_prawna_typ_id:

  1 — Organizacje biznesowe
  2 — Organizacje pozarządowe
  3 — Samodzielne publiczne zakłady opieki zdrowotnej
*/
export interface KrsDataRow {
  'krs_podmioty.adres': string;
  'krs_podmioty.adres_kod_pocztowy': string;
  'krs_podmioty.adres_kraj': string;
  'krs_podmioty.adres_lokal': string;
  'krs_podmioty.adres_miejscowosc': string;
  'krs_podmioty.adres_numer': string;
  'krs_podmioty.adres_poczta': string;
  'krs_podmioty.adres_ulica': string;
  'krs_podmioty.cel_dzialania': string;
  'krs_podmioty.data_dokonania_wpisu': string;
  'krs_podmioty.data_rejestracji': string;
  'krs_podmioty.data_sprawdzenia': string;
  'krs_podmioty.dotacje_ue_beneficjent_id': string;
  'krs_podmioty.email': string;
  'krs_podmioty.firma': string;
  'krs_podmioty.forma_prawna_id': string;
  'krs_podmioty.forma_prawna_str': string;
  'krs_podmioty.forma_prawna_typ_id': '1' | '2' | '3';
  'krs_podmioty.gmina_id': string;
  'krs_podmioty.gpw_spolka_id': string;
  'krs_podmioty.id': string;
  'krs_podmioty.knf_ostrzezenie_id': string;
  'krs_podmioty.kod_pocztowy_id': string;
  'krs_podmioty.krs': string;
  'krs_podmioty.liczba_akcji_wszystkich_emisji': number;
  'krs_podmioty.liczba_czlonkow_komitetu_zal': number;
  'krs_podmioty.liczba_dzialalnosci': number;
  'krs_podmioty.liczba_emisji_akcji': number;
  'krs_podmioty.liczba_jedynych_akcjonariuszy': number;
  'krs_podmioty.liczba_nadzorcow': number;
  'krs_podmioty.liczba_oddzialow': number;
  'krs_podmioty.liczba_prokurentow': number;
  'krs_podmioty.liczba_reprezentantow': number;
  'krs_podmioty.liczba_wspolnikow': number;
  'krs_podmioty.liczba_zmian': number;
  'krs_podmioty.liczba_zmian_umow': number;
  'krs_podmioty.miejscowosc_id': string;
  'krs_podmioty.nazwa': string;
  'krs_podmioty.nazwa_organu_nadzoru': string;
  'krs_podmioty.nazwa_organu_reprezentacji': string;
  'krs_podmioty.nazwa_skrocona': string;
  'krs_podmioty.nieprzedsiebiorca': string;
  'krs_podmioty.nip': string;
  'krs_podmioty.numer_wpisu': number;
  'krs_podmioty.opp': string;
  'krs_podmioty.ostatni_wpis_id': string;
  'krs_podmioty.oznaczenie_sadu': string;
  'krs_podmioty.powiat_id': string;
  'krs_podmioty.regon': string;
  'krs_podmioty.rejestr': string;
  'krs_podmioty.rejestr_stowarzyszen': string;
  'krs_podmioty.siedziba': string;
  'krs_podmioty.sposob_reprezentacji': string;
  'krs_podmioty.sygnatura_akt': string;
  'krs_podmioty.twitter_account_id': string;
  'krs_podmioty.umowa_spolki_cywilnej': string;
  'krs_podmioty.wartosc_czesc_kapitalu_wplaconego': number;
  'krs_podmioty.wartosc_kapital_docelowy': number;
  'krs_podmioty.wartosc_kapital_zakladowy': number;
  'krs_podmioty.wartosc_nominalna_akcji': number;
  'krs_podmioty.wartosc_nominalna_podwyzszenia_kapitalu': number;
  'krs_podmioty.wczesniejsza_rejestracja_str': string;
  'krs_podmioty.wojewodztwo_id': string;
  'krs_podmioty.www': string;
  'krs_podmioty.wykreslony': string;
}

/*
  Layers available only when getting only single krs data
 */
export interface SingleKrsDataHttpResponse extends Dataobject {
  data: KrsDataRow;
  layers?: {
    channels: null;
    dataset: null;
    page: null;
    subscribers: null;
    dzialalnosci?: Array<KrsLayers.KrsLayerDzialalnosci>;
    emisje_akcji?: Array<KrsLayers.KrsLayerEmisjeAkcji>;
    firmy?: Array<KrsLayers.KrsLayerFirmy>;
    graph?: Array<KrsLayers.KrsLayerGraph>;
    jedynyAkcjonariusz?: Array<KrsLayers.KrsLayerJedynyAkcjonariusz>;
    komitetZalozycielski?: Array<KrsLayers.KrsLayerKomitetZalozycielski>;
    nadzor?: Array<KrsLayers.KrsLayerNadzor>;
    oddzialy?: Array<KrsLayers.KrsLayerOddzialy>;
    prokurenci?: Array<KrsLayers.KrsLayerProkurenci>;
    reprezentacja?: Array<KrsLayers.KrsLayerReprezentacja>;
    wspolnicy?: Array<KrsLayers.KrsLayerWspolnicy>;
  };
}

export interface KrsDataHttpResponse extends HttpResponse {
  Dataobject: Array<SingleKrsDataHttpResponse>;
}

