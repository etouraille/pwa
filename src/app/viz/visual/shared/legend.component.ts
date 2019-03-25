import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {GraphService} from '../../d3/graph';

@Component({
    selector: '[legend]',
    template: `
    <svg:g [attr.transform]="'translate(' + elem.x + ',' + elem.y + ')'" *ngFor="let elem of data">
      <svg:rect
          x="0"
          y="0"
          width="100"
          height="20"
          [style]="elem.style">
      </svg:rect>
      <svg:text x="10" y="15">
        {{ elem.text }}
      </svg:text>
    </svg:g>
  `
})
export class LegendComponent implements OnInit {
    @Input('legend') legend;

    public data: any = [];

    constructor(private sanitizer: DomSanitizer, private graphService : GraphService) {}

    ngOnInit() {
        console.log( this.legend );
        this.data = this.legend.data.map((elem, index ) => {
            const ret = { style :  this.graphService.color(index, this.legend.data.length), text : elem.label };
            return Object.assign(ret, this.position( index, this.legend.data.length ));
        });
    }

    private position(index , sizeof ) {

        const x = this.legend.options.width - 2 * 100;
        const y = this.legend.options.height - ( sizeof - index ) * 25;
        return {x : x, y : y };
    }

}
