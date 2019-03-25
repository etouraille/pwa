import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { D3Service } from './../../d3/d3.service';
import { ForceDirectedGraph, Node } from './../../d3/model';
import {GraphService} from '../../d3/graph';

@Component({
    selector: 'graph',
    template: `
    <svg #svg [attr.width]="width" [attr.height]="height">
      <g>
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"></g>
        <g [legend]="data"></g>
      </g>
    </svg>
  `,
    styleUrls: ['./graph.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {
    @Input('nodes') nodes;
    @Input('data') data;


    public links: any;
    public width: number = 0;
    public height: number = 0;

    graph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private graphService: GraphService, private ref : ChangeDetectorRef) { }

    ngOnInit() {


        this.data.subscribe((data ) => {

            this.width = data.options.width;
            this.height = data.options.height;
            this.links = this.graphService.getLines(data.data, data.options);
            this.ref.markForCheck();
        });

    }
}
