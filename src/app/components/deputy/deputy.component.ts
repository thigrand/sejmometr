import { Component, OnInit } from '@angular/core';
import { DeputiesService } from '../../services/deputies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deputy',
  templateUrl: './deputy.component.html',
  styleUrls: ['./deputy.component.scss']
})
export class DeputyComponent implements OnInit  {
  constructor(private deputiesService: DeputiesService) {}

  ngOnInit() {
// https://api-v3.mojepanstwo.pl/dane/poslowie/{$id}.json
//     https://api-v3.mojepanstwo.pl/dane/poslowie/{281}.json
    this.deputiesService.getSingleData('281').subscribe(deputy => {
      console.log('deputy', deputy);
    });
  }
}
