import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DeputyResolver implements Resolve<any> {
  constructor(
    private deputyService,
    private router: Router
  ){ }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let id = +route.params['id'];
    return this.deputyService.getDeputies(id)
      .catch((error: any) => {
        console.log(`${error}. Error w resolverze routingu.`);
        this.router.navigate(['/dashboard']);
        return Observable.of(null);
      });
  }
}
