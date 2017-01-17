import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  constructor() { }
  hideLoader() {
    let componentToHide = document.querySelector('.Preloader');
    let classes = componentToHide.className;
    if ( !classes.match(/'hide'/) ) {
      classes += ' hide';
      componentToHide.className = classes;
    }
  }
  displayLoader() {
    let componentToShow: any = document.querySelector('.Preloader');
    componentToShow.className = 'Preloader';
  }
}
