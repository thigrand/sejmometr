import {Injectable} from '@angular/core';
import {HttpService} from "./http";
import {UtilsService} from "./utils";
import {krsLayers} from "../interfaces/";

@Injectable()
export class KrsService {
  constructor(
    private httpService: HttpService,
    private utilsService: UtilsService
  ) {}

  getDataFiltered(filterObj = {}, limit?, page?){
    if(limit){
      this.utilsService.mergeObjects(filterObj,{limit});
    }
    if(page){
      this.utilsService.mergeObjects(filterObj,{page});
    }
    return this.httpService.getResources('krs_podmioty.json', filterObj);
  }
  getAllData(){
    return this.getDataFiltered();
  }
  getSingleData(id: string, layers?: krsLayers){
    let layersObj = layers ? {layers} : {};
    return this.httpService.getResources(`krs_podmioty/${id}.json`,layersObj)
  }
  getFormyPrawne(){
    return this.httpService.getResources('krs_formy_prawne.json');
  }
}
