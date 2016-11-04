import {
  Dataobject,
  HttpResponse,
  PublicOrdersFields
} from './';

interface PublicOrdersRow {
  'zamowienia_publiczne.akcept': string;
  'zamowienia_publiczne.aukcja': string;
  'zamowienia_publiczne.czas': string;
  'zamowienia_publiczne.data_publikacji': string;
  'zamowienia_publiczne.data_publikacji_zamowienia': string;
  'zamowienia_publiczne.dialog': string;
  'zamowienia_publiczne.dsz_www': string;
  'zamowienia_publiczne.dyn_www': string;
  'zamowienia_publiczne.gmina_id': string;
  'zamowienia_publiczne.id': string;
  'zamowienia_publiczne.instytucja_id': string;
  'zamowienia_publiczne.kod_pocztowy_id': string;
  'zamowienia_publiczne.kryterium_kod': string;
  'zamowienia_publiczne.liczba_czesci': number;
  'zamowienia_publiczne.liczba_dni': number;
  'zamowienia_publiczne.liczba_dni_oferty': number;
  'zamowienia_publiczne.liczba_miesiecy': number;
  'zamowienia_publiczne.liczba_wykonawcow': number;
  'zamowienia_publiczne.nazwa': string;
  'zamowienia_publiczne.nazwa_biuletynu': number;
  'zamowienia_publiczne.numer_zamowienia': number;
  'zamowienia_publiczne.oferty_czesciowe': string;
  'zamowienia_publiczne.oferty_godz': string;
  'zamowienia_publiczne.ogloszenie_bzp': string;
  'zamowienia_publiczne.powiat_id': string;
  'zamowienia_publiczne.pozycja': number;
  'zamowienia_publiczne.projekt_ue': string;
  'zamowienia_publiczne.przedmiot': string;
  'zamowienia_publiczne.publikacja_obowiazkowa': string;
  'zamowienia_publiczne.rodzaj_id': string;
  'zamowienia_publiczne.sprawozdanie_calosc': string;
  'zamowienia_publiczne.sprawozdanie_lata_obrotowe': string;
  'zamowienia_publiczne.status_id': string;
  'zamowienia_publiczne.termin': string;
  'zamowienia_publiczne.tryb_id': string;
  'zamowienia_publiczne.typ_id': string;
  'zamowienia_publiczne.uniewaznienie': string;
  'zamowienia_publiczne.uzupelniajace': string;
  'zamowienia_publiczne.wariant': string;
  'zamowienia_publiczne.wartosc_cena': number;
  'zamowienia_publiczne.wartosc_cena_max': number;
  'zamowienia_publiczne.wartosc_cena_min': number;
  'zamowienia_publiczne.wartosc_szacowana': number;
  'zamowienia_publiczne.wartosc_szacunkowa': number;
  'zamowienia_publiczne.wojewodztwo_id': string;
  'zamowienia_publiczne.wykonawca_str': string;
  'zamowienia_publiczne.zaliczka': string;
  'zamowienia_publiczne.zamawiajacy_email': string;
  'zamowienia_publiczne.zamawiajacy_fax': string;
  'zamowienia_publiczne.zamawiajacy_id': string;
  'zamowienia_publiczne.zamawiajacy_kod_poczt': string;
  'zamowienia_publiczne.zamawiajacy_miejscowosc': string;
  'zamowienia_publiczne.zamawiajacy_nazwa': string;
  'zamowienia_publiczne.zamawiajacy_nr_domu': string;
  'zamowienia_publiczne.zamawiajacy_nr_miesz': string;
  'zamowienia_publiczne.zamawiajacy_regon': string;
  'zamowienia_publiczne.zamawiajacy_rodzaj': string;
  'zamowienia_publiczne.zamawiajacy_rodzaj_inny': string;
  'zamowienia_publiczne.zamawiajacy_tel': string;
  'zamowienia_publiczne.zamawiajacy_ulica': string;
  'zamowienia_publiczne.zamawiajacy_wojewodztwo': string;
  'zamowienia_publiczne.zamawiajacy_www': string;
  'zamowienia_publiczne.zamowienie_ue': string;
  'zamowienia_publiczne.zmiana_ogloszenia': string;
  'zamowienia_publiczne.zmiana_umowy': string;
  'zamowienia_publiczne_rodzaje.id': string;
  'zamowienia_publiczne_rodzaje.nazwa': string;
  'zamowienia_publiczne_tryby.id': string;
  'zamowienia_publiczne_tryby.nazwa': string;
  'zamowienia_publiczne_typy.id': string;
  'zamowienia_publiczne_typy.nazwa': string;
  'zamowienia_publiczne_typy.symbol': string;
  'zamowienia_publiczne_zamawiajacy.id': string;
  'zamowienia_publiczne_zamawiajacy.kod_pocztowy_id': string;
  'zamowienia_publiczne_zamawiajacy.nazwa': string;
}

/*
 Fields data available only when getting only single zamowienia_publiczne data
 */
export interface SinglePublicOrdersDataHttpResponse extends Dataobject {
  data: PublicOrdersRow;
  // fields data
  'zamowienia_publiczne-kryteria'?: Array<PublicOrdersFields.PublicOrderCriteria>;
  'zamowienia_publiczne-wykonawcy'?: Array<PublicOrdersFields.PublicOrderContractor>;
}

export interface PublicOrdersDataHttpResponse extends HttpResponse {
  Dataobject: Array<SinglePublicOrdersDataHttpResponse>;
}
