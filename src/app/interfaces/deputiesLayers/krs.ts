export interface DeputiesLayerKrsNgoOrganizacja {
  cel_dzialania: string;
  data_rejestracji: string;
  forma_prawna_str: string;
  id: string;
  kapital_zakladowy: string;
  nazwa: string;
}

export interface DeputiesLayerKrsNgoRola {
  deleted: string;
  id: string;
  label: string;
}

export interface DeputiesLayerKrsNgoForma {
  typ_id: string;
}

export interface DeputiesLayerKrsNgoBiznes {
  forma: DeputiesLayerKrsNgoForma;
  organizacja: DeputiesLayerKrsNgoOrganizacja;
  rola: DeputiesLayerKrsNgoRola;
}

export interface DeputiesLayerKrs {
  biznes: Array<DeputiesLayerKrsNgoBiznes>;
  ngo: Array<DeputiesLayerKrsNgoBiznes>;
}
