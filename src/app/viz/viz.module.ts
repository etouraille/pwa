import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {IndexPage} from './page/index/index.page';
import {IonicModule} from '@ionic/angular';
import {GraphComponent} from './visual/graph/graph.component';
import {LinkVisualComponent, NodeVisualComponent, SHARED_VISUALS} from './visual/shared';
import {D3Service} from './d3/d3.service';
import {GraphService} from './d3/graph';
import {LegendComponent} from './visual/shared/legend.component';

@NgModule({
  declarations: [IndexPage, GraphComponent, LinkVisualComponent, NodeVisualComponent, LegendComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
          {
            path: '',
            component: IndexPage
          }
    ])
  ]
})
export class VizModule { }
