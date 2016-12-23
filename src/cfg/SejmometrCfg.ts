export class SejmometrCfg {
  currentCandence: string = '8';
  politicalPartiesClubsData = {
    '13': {
      club_id: '13',
      club_name: 'Kukiz\'15',
      img: 'assets/PPlogos/kukiz.png'
    },
    '2': {
      club_id: '2',
      club_name: 'Prawo i Sprawiedliwość',
      img: 'assets/PPlogos/pis.jpg'
    },
    '3': {
      club_id: '3',
      club_name: 'Polskie Stronnictwo Ludowe',
      img: 'assets/PPlogos/psl.jpg'
    },
    '1': {
      club_id: '1',
      club_name: 'Platforma Obywatelska',
      img: 'assets/PPlogos/po.jpg'
    },
    '14': {
      club_id: '14',
      club_name: 'Nowoczesna',
      img: 'assets/PPlogos/nowoczesna.png'
    },
    '7': {
      club_id: '7',
      club_name: 'Niezrzeszeni',
      img: ''
    },
    BRAK: {
      club_id: '',
      img: ''
    }
  };
  deputyExpensesArr: Array<string> = [
    'poslowie.wartosc_biuro_biuro',
    'poslowie.wartosc_biuro_ekspertyzy',
    'poslowie.wartosc_biuro_inne',
    'poslowie.wartosc_biuro_materialy_biurowe',
    'poslowie.wartosc_biuro_podroze_pracownikow',
    'poslowie.wartosc_biuro_przejazdy',
    'poslowie.wartosc_biuro_spotkania',
    'poslowie.wartosc_biuro_srodki_trwale',
    'poslowie.wartosc_biuro_taksowki',
    'poslowie.wartosc_biuro_telekomunikacja',
    'poslowie.wartosc_biuro_wynagrodzenia_pracownikow',
    'poslowie.wartosc_biuro_zlecenia',
    'poslowie.wartosc_refundacja_kwater_pln',
    'poslowie.wartosc_uposazenia_pln',
    'poslowie.wartosc_wyjazdow'
  ];
}
