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

    public subscribe() {
      console.log( 'on subscribe');
      this.swPush.requestSubscription({
          serverPublicKey: 'BE0FtvWyTuFS36TUASKmdm6cdSmWBWb-sNny5zRZLurbpcklzZCV00zCi-YSpHYQzuc143_zGFWCnNEGIWVCDM0'
      }).then(sub => {
            this.notification.subscribe( sub );
      }).catch( error => { console.log('could nt subscribe to notification', error )});
    }

    public test() {
      this.http.get('http://localhost/api/test' ).subscribe( data => {
          console.log( 'data test ', data );
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
