import { Component , OnInit} from '@angular/core';
import {of, interval } from 'rxjs';
import {concatMapTo, concatMap, mergeMap, delay, take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit() {
  }
}
// concatMapTo : souscrit a l'observable founie quand la précédente est résolue : emet les valeurs;
// concatMap : Map les valeur dans une observable contenue, souscrit et emet dans l'ordre : Map values to inner observable, subscribe and emit in order.

// donc concatMap souscrit a une observable a partir du moment ou la précedente a emise
// mergeMap souscrit a tout les observable en même temps.
