import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { D3Service } from './../../d3/d3.service';
import { ForceDirectedGraph, Node } from './../../d3/model';
import {GraphService} from '../../d3/graph';

@Component({
    selector: 'graph',
    template: `
    <svg #svg [attr.width]="data.options.width" [attr.height]="data.options.height">
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
export class GraphComponent implements OnInit, AfterViewInit {
    @Input('nodes') nodes;
    @Input('data') data;


    public links: any;

    graph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private graphService: GraphService, private ref : ChangeDetectorRef) { }

    ngOnInit() {

        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links = this.graphService.getLines(this.data.data, this.data.options), this.data.options);

        this.graph.ticker.subscribe((d) => {
            this.ref.markForCheck();
        });
    }

    ngAfterViewInit() {
        this.graph.initSimulation(this.data.options);
    }
}
