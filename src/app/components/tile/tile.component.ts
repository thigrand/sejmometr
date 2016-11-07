import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input('amount') amount: any[];
  @Input('name') name: any[];
  @Input('img') img: any[];
  constructor() { }

  ngOnInit() {
  }

}
