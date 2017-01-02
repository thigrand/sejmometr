import {
  Dataobject,
  DeputiesLayers,
  ApiHttpResponse,
  MappedHttpResponse
} from './';

export interface DeputyRow {
  'ludzie.id': string;
  'ludzie.nazwa': string;
  'ludzie.slug': string;
  'poslowie.biuro_html': string;
  'poslowie.data_urodzenia': string;
  'poslowie.dopelniacz': string;
  'poslowie.frekwencja': number;
  'poslowie.id': string;
  'poslowie.imie_drugie': string;
  'poslowie.imie_pierwsze': string;
  'poslowie.imiona': string;
  'poslowie.kadencja': Array<number>;
  'poslowie.kadencja_ostatnia': string;
  'poslowie.klub_id': string;
  'poslowie.krs_osoba_id': string;
  'poslowie.liczba_glosow': number;
  'poslowie.liczba_glosowan': number;
  'poslowie.liczba_glosowan_opuszczonych': number;
  'poslowie.liczba_glosowan_zbuntowanych': number;
  'poslowie.liczba_interpelacji': number;
  'poslowie.liczba_komisji': number;
  'poslowie.liczba_podkomisji': number;
  'poslowie.liczba_projektow_uchwal': number;
  'poslowie.liczba_projektow_ustaw': number;
  'poslowie.liczba_przejazdow': number;
  'poslowie.liczba_przelotow': number;
  'poslowie.liczba_slow': number;
  'poslowie.liczba_uchwal_komisji_etyki': number;
  'poslowie.liczba_wnioskow': number;
  'poslowie.liczba_wyjazdow': number;
  'poslowie.liczba_wypowiedzi': number;
  'poslowie.mandat_wygasl': string;
  'poslowie.miejsce_urodzenia': string;
  'poslowie.miejsce_zamieszkania': string;
  'poslowie.mowca_id': string;
  'poslowie.nazwa': string;
  'poslowie.nazwa_odwrocona': string;
  'poslowie.nazwisko': string;
  'poslowie.numer_legitymacji': number;
  'poslowie.numer_na_liscie': number;
  'poslowie.okreg_gminy_str': string;
  'poslowie.okreg_wyborczy_numer': string;
  'poslowie.pkw_komitet_id': string;
  'poslowie.pkw_nr_listy': string;
  'poslowie.plec': string;
  'poslowie.procent_glosow': number;
  'poslowie.rozliczenie_id': string;
  'poslowie.sejm_okreg_id': string;
  'poslowie.twitter_account_id': string;
  'poslowie.wartosc_biuro_biuro': number;
  'poslowie.wartosc_biuro_ekspertyzy': number;
  'poslowie.wartosc_biuro_inne': number;
  'poslowie.wartosc_biuro_materialy_biurowe': number;
  'poslowie.wartosc_biuro_podroze_pracownikow': number;
  'poslowie.wartosc_biuro_przejazdy': number;
  'poslowie.wartosc_biuro_spotkania': number;
  'poslowie.wartosc_biuro_srodki_trwale': number;
  'poslowie.wartosc_biuro_taksowki': number;
  'poslowie.wartosc_biuro_telekomunikacja': number;
  'poslowie.wartosc_biuro_wynagrodzenia_pracownikow': number;
  'poslowie.wartosc_biuro_zlecenia': number;
  'poslowie.wartosc_refundacja_kwater_pln': number;
  'poslowie.wartosc_uposazenia_pln': number;
  'poslowie.wartosc_wyjazdow': number;
  'poslowie.zawod': string;
  'poslowie.zbuntowanie': number;
  'sejm_kluby.id': string;
  'sejm_kluby.nazwa': string;
  'sejm_kluby.skrot': string;
}

/*
 Layers available only when getting only single deputy data
 */
export interface SingleDeputyDataHttpResponse extends Dataobject {
  data: DeputyRow;
  layers?: {
    dataset: null;
    channels: null;
    page: null;
    subscribers: null;
    krs?: DeputiesLayers.DeputiesLayerKrs;
    wydatki?: DeputiesLayers.DeputiesLayerWydatki;
    wyjazdy?: DeputiesLayers.DeputiesLayerWyjazdy;
    biura?: DeputiesLayers.DeputiesLayerBiura; // its always empty array so no interface `till data filled
  };
}

export interface DeputyDataApiResponse extends ApiHttpResponse {
  Dataobject: Array<SingleDeputyDataHttpResponse>;
}

export interface DeputyDataHttpResponse extends MappedHttpResponse {
  response: DeputyDataApiResponse;
}
