import { Component, OnInit } from '@angular/core';
import {Link, Node} from '../../d3/model';
import {GraphService} from '../../d3/graph';
import {RepositoryService} from '../../data/repository';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  public nodes: Node[] = [];
  public options : any;
  public data: any;
  public filters: any;
  constructor(private graphService: GraphService, private repository: RepositoryService) { }

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


      this.filters = this.repository.getFilters();

      const data = this.repository.all();

      this.data = { data : data , options : {
              width: window.innerWidth,
              height: 500
          }};
  }

  changeFilter( value: any ) {
      //sconsole.log( value.detail.value );

      this.data = Object.assign(this.data, { data : this.repository.filter( parseInt(value.detail.value))});
        console.log( this.data );
  }
}
