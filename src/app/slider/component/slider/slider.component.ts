import { Component, OnInit , ViewChild} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {select, Store} from '@ngrx/store';
import {Factor} from '../../../model/factor';
import {selectAllEval, selectAllFactor} from '../../../reducer/factor.reducer';
import {LoadEvalsFromFactors, UpsertEval} from '../../../action/eval.action';
import {Eval} from '../../../model/eval';
import {StorageService} from '../../../service/storage.service';
import {DiffService} from '../../../service/diff.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChild('slides') slides: IonSlides;

  public factors: Factor[] = [];
  public evals: Eval[] = [];
  subscribed = [];

  slideOpts = {
    effect: 'flip'
  };
  constructor(  private store: Store<any>, private storage: StorageService, private diff: DiffService ) {

  }

  ngOnInit() {

    this.subscribed.push(this.store.pipe(select(selectAllEval)).subscribe( evals => {
      this.evals = evals;
    }));

    this.saveToStore();
  }

  next() {
    this.slides.slideNext();
  }

  getKey(): string  {
    let month: any = (new Date()).getMonth() + 1;
    month = (month < 10 ) ? ('0' + month) : ('' + month);
    const key = (new Date()).getFullYear() + '' +  month + '' +  (new Date()).getDate();
    console.log( 'KEY', key );
    return key;

  }

  saveToStore() {
    const key = this.getKey();
    this.subscribed.push(this.store.pipe(select(selectAllEval)).subscribe( evals => {
      if (!this.diff.equals(evals, this.storage.get(key))) {
        this.storage.set(key, evals);
      }
    }));
  }

  prev() {
    this.slides.slidePrev();
  }

  public uns() {
    this.subscribed.forEach( sub => {
      sub.unsubscribe();
    })
    return true;
  }

  valueChanged(value: any, evaluation: Eval ) {
    evaluation.value = value.value;
    console.log( evaluation );
    this.store.dispatch( new UpsertEval({ evaluation: evaluation }));
  }
}
