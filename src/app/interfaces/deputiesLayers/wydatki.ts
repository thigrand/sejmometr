interface DeputiesLayerWydatkiPunkt {
  numer: string;
  tytul: string;
}

interface DeputiesLayerWydatkiRocznik {
  dokument_id: string;
  pola: Array<string>;
  rok: string;
}

export interface DeputiesLayerWydatki {
  liczba_pol: number;
  liczba_rocznikow: number;
  punkty: Array<DeputiesLayerWydatkiPunkt>;
  roczniki: Array<DeputiesLayerWydatkiRocznik>;
}
