import {
  Dataobject,
  HttpResponse
} from "./";

interface PublicOrderDocumentRowWykonawca{
  cena: number;
  id: string;
  krs_id: string;
  liczba_czesci: number;
  miejscowosc: string;
  nazwa: string;
  walute: string;
}

interface PublicOrderWykonawca{
  id: string;
  krs_id: string;
  miejscowosc: string;
  nazwa: string;
}

interface PublicOrderDocumentDetailsCzesciWykonawcy{
  cena: string;
  cena_max: string;
  data_zam: string;
  id: number;
  liczba_ofert: string;
  liczba_wykonawcow: string;
  nazwa: string;
  numer: string;
  waluta: string;
  wartosc: string;
  wykonawcy: Array<PublicOrderWykonawca>;
}

interface PublicOrderDocumentDetails{
  'czesci-wykonawcy'?: PublicOrderDocumentDetailsCzesciWykonawcy;
  info?: string;
  inne_dokumenty?: string;
  oferty_miejsce?: string;
  osoby_zdolne?: string;
  potencjal?: string;
  przedmiot?: string;
  siwz_www?: string;
  sytuacja_ekonomiczna?: string;
  uprawnienie?: string;
  wadium?: string;
  wiedza?: string;
  zmieniona_umowa?: string;
}

interface PublicOrderDocumentsRow{
  'zamowienia_publiczne_dokumenty.child': string;
  'zamowienia_publiczne_dokumenty.childsCount': string;
  'zamowienia_publiczne_dokumenty.cpv1c': string;
  'zamowienia_publiczne_dokumenty.czas_dni': string;
  'zamowienia_publiczne_dokumenty.czas_miesiace': string;
  'zamowienia_publiczne_dokumenty.data_publikacji': string;
  'zamowienia_publiczne_dokumenty.data_stop': string;
  'zamowienia_publiczne_dokumenty.gmina_id': string;
  'zamowienia_publiczne_dokumenty.id': string;
  'zamowienia_publiczne_dokumenty.instytucja_id': string;
  'zamowienia_publiczne_dokumenty.le_adres_aukcja': string;
  'zamowienia_publiczne_dokumenty.le_adres_opis': string;
  'zamowienia_publiczne_dokumenty.le_godz_skl': string;
  'zamowienia_publiczne_dokumenty.le_term_otw': string;
  'zamowienia_publiczne_dokumenty.le_term_war_zam': string;
  'zamowienia_publiczne_dokumenty.nazwa': string;
  'zamowienia_publiczne_dokumenty.oferty_data_stop': string;
  'zamowienia_publiczne_dokumenty.oferty_godz': string;
  'zamowienia_publiczne_dokumenty.oferty_liczba_dni': string;
  'zamowienia_publiczne_dokumenty.ogloszenie': string;
  'zamowienia_publiczne_dokumenty.paczka_id': string;
  'zamowienia_publiczne_dokumenty.parent_id': string;
  'zamowienia_publiczne_dokumenty.powiat_id': string;
  'zamowienia_publiczne_dokumenty.przedmiot': string;
  'zamowienia_publiczne_dokumenty.rodzaj_id': string;
  'zamowienia_publiczne_dokumenty.status_id': string;
  'zamowienia_publiczne_dokumenty.tryb_id': string;
  'zamowienia_publiczne_dokumenty.typ_id': string;
  'zamowienia_publiczne_dokumenty.wartosc_cena': number;
  'zamowienia_publiczne_dokumenty.wojewodztwo_id': string;
  'zamowienia_publiczne_dokumenty.wykonawca_id': string;
  'zamowienia_publiczne_dokumenty.wykonawca_str': string;
  'zamowienia_publiczne_dokumenty.wykonawcy'?: Array<PublicOrderDocumentRowWykonawca>;
  'zamowienia_publiczne_dokumenty.zamawiajacy_id': string;
  'zamowienia_publiczne_dokumenty.zamawiajacy_nazwa': string;
  'zamowienia_publiczne_dokumenty.zamowienie_data_publikacji': string;
  'zamowienia_publiczne_dokumenty.zamowienie_id': string;
  'zamowienia_publiczne_dokumenty.zamowienie_nr': string;
}

/*
  Details available only when using fields[]=details in http request
 */
export interface SinglePublicOrderDocumentHttpResponse extends Dataobject{
  data: PublicOrderDocumentsRow;
  details?: PublicOrderDocumentDetails;
}

export interface PublicOrderDocumentsHttpResponse extends HttpResponse{
  Dataobject: Array<SinglePublicOrderDocumentHttpResponse>;
}
