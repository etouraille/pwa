import { Component, OnInit , OnDestroy, DoCheck } from '@angular/core';
import { FactorService } from '../../../service/factor.service';
import {createFeatureSelector, createSelector, select, Store} from '@ngrx/store';
import { FactorEntity } from '../../../Entity/factor';
import {AddFactor, DeleteFactor, UpsertFactor} from '../../../action/factor.action';
import {Factor} from '../../../model/factor';
import * as fromFactor from './../../../reducer/factor.reducer';
import {StorageService} from '../../../service/storage.service';
import {DiffService} from '../../../service/diff.service';
import {selectAllFactor} from './../../../reducer/factor.reducer';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, DoCheck {

  factor: string = '';
  factors: Factor[] = [];
  subscribed = [];

  constructor(public factorService: FactorService, private store: Store<any>, private storage: StorageService, private diff : DiffService ) {
  }

  ngOnInit() {

    const selectFactorState = createFeatureSelector<fromFactor.State>('factors');

    this.subscribed.push(this.store.pipe(select(selectAllFactor, true)).subscribe(val => {
      this.factors = val;
      //selectAllFactor.release();
    }));

    this.subscribed.push(this.store.pipe(select(selectAllFactor)).subscribe(val => {
        console.log(val);
        if (!this.diff.equals(this.storage.get('factors'), val )) {
          this.storage.set('factors', val );
          console.log( 'save');
        } else {
          console.log( 'not save');
        }
        //selectAllFactor.release();
    }));
  }

  uns(): boolean {
    this.subscribed.forEach( sub => {
      sub.unsubscribe();
    });
    return true;
  }

  public addFactor() {

    const factor = new FactorEntity(this.factor);
    this.store.dispatch(new AddFactor({factor: factor }));
    this.factor = '';
  }

  public remove(id: string) {
    this.store.dispatch(new DeleteFactor(id));
  }

  public upsertFactor(factor: Factor ) {
    this.store.dispatch( new UpsertFactor( {factor : factor }));
  }

  ngDoCheck(): void {
    //console.log('check');
  }
}
