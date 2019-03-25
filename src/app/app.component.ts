import {Component, OnDestroy} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AddFactor} from './action/factor.action';
import {StorageService} from './service/storage.service';
import {select, Store} from '@ngrx/store';
import {LoadEvalsFromFactors, UpsertEval} from './action/eval.action';
import {selectAllFactor} from './reducer/factor.reducer';
import {SwPush} from '@angular/service-worker';
import {NotificationService} from './service/notification.service';
import {HttpClient} from '@angular/common/http';
import {RequestListenerService} from './service/request-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  public appPages = [
    {
       title: 'Curseurs',
       url: '/slider',
       icon: 'list'
    },
    {
      title: 'Configuration',
      url: '/config',
      icon: 'settings'
    },
    {
          title: 'Visualisation',
          url: '/viz',
          icon: 'stats'
     }
  ];

  subscribed = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private store: Store<any>,
    private swPush: SwPush,
    private notification: NotificationService,
    private http: HttpClient,
    private requestListener: RequestListenerService,
  ) {
    this.initializeApp();
      this.storage.get('factors').forEach(factor => {
        this.store.dispatch(new AddFactor({factor: factor }));
      });

      storage.get(this.getKey()).forEach( evaluation => {
          this.store.dispatch(new UpsertEval({ evaluation: evaluation }));
      });

      // load from factor : ajoute les evaluation a partir de l'idFactor, si il n'existe pas déjà

      this.subscribed.push(this.store.pipe(select(selectAllFactor, true)).subscribe( val => {
        this.store.dispatch(new LoadEvalsFromFactors({factors: val }));
      }));

      this.swPush.messages.subscribe(message => {
          console.log('MESSAGE', message);
      });
    }

    getKey(): string  {
        let month: any = (new Date()).getMonth() + 1;
        month = (month < 10 ) ? ('0' + month) : ('' + month);
        const key = (new Date()).getFullYear() + '' +  month + '' +  (new Date()).getDate();
        console.log( 'KEY', key );
        return key;

    }


    initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    console.log('DESTROYED');
  }
}
