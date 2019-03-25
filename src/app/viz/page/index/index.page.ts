import { Component, OnInit } from '@angular/core';
import {Link, Node} from '../../d3/model';
import {GraphService} from '../../d3/graph';
import {RepositoryService} from '../../data/repository';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public nodes: Node[] = [];
  public options: any;
  public data: BehaviorSubject<any> = new BehaviorSubject<any>({ data : [], options : {
          width: window.innerWidth,
          height: 500
      }});
  public filters: any;
  constructor(private graphService: GraphService, private repository: RepositoryService) { }
  public width = 992;
  ngOnInit() {

    /*
    this.data = { data:
                    [{ x: [1, 2, 3] , y : [ Math.sqrt(1), Math.sqrt(2), Math.sqrt( 3)], label : 'sqrt'}
                  , { x :[1, 2, 3, 4], y : [ Math.log(1), Math.log(2), Math.log(3), Math.log(4)], label : 'log'}]
        ,options: {
            width: 300,
            height: 300
        }
      }
     */
      if( window.innerWidth < this.width ) {
          this.width = window.innerWidth;
      }


      this.filters = this.repository.getFilters();

      const data = this.repository.all();

      this.data.next({ data : data , options : {
              width: this.width,
              height: 500
          }});
  }

  changeFilter( value: any ) {

      console.log( value );
      this.data.next({ data : this.repository.filter( value.detail.value), options : {
              width: this.width,
              height: 500
          }});

  }
}
