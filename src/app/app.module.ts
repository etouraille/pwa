import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule , HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {GestureConfig } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {ActionReducerMap, StoreModule} from '@ngrx/store';
import * as fromFactor from './reducer/factor.reducer';
import {Service} from './reducer/factor.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';


const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<fromFactor.State>>('reducer');

export function getReducers(service: Service) {
  return service.getReducers();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({ factor: fromFactor.reducer, evaluation: fromFactor.evaluationReducer }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: REDUCER_TOKEN, deps: [Service], useFactory: getReducers},
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
