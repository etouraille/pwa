import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './component/slider/slider.component';
import { IonicModule} from '@ionic/angular';
import { MatSliderModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UnsubscriberService} from '../service/unsubscriber.service';

@NgModule({
  declarations: [SliderComponent],
  imports: [
    MatSliderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Ng5SliderModule,
    RouterModule.forChild([{
        path : '',
        component: SliderComponent,
        canDeactivate: [UnsubscriberService]
    }])
  ]
})
export class SliderModule { }
