import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConfigComponent } from './page/config/config.component';
import { EditableComponent } from './component/editable/editable.component';
import { StoreModule} from '@ngrx/store';
import * as fromFactor from './../reducer/factor.reducer';
import { UnsubscriberService } from '../service/unsubscriber.service';

@NgModule({
  declarations: [ConfigComponent, EditableComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    //StoreModule.forFeature('factor' ,  fromFactor.reducer ),
    RouterModule.forChild([ {
      path: '',
      component: ConfigComponent,
      canDeactivate: [UnsubscriberService]
    }])
  ]
})
export class ConfigModule { }
