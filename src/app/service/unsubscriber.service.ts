import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ConfigComponent } from '../config/page/config/config.component';

@Injectable({
  providedIn: 'root'
})
export class UnsubscriberService implements CanDeactivate<any> {


  constructor() {}

  canDeactivate(
                component: any,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot) {
    console.log( 'UNSUBSCRIBE ================================ UNS');
    return component.uns();
  }

}
