import { Injectable } from '@angular/core';
import {VizModule} from '../viz.module';
import {Link, Node} from './model';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class GraphService {

    constructor(private sanitizer:DomSanitizer) {}

    color(index, sizeof ) {
        const r = index / ( sizeof - 1 ) * 255;
        return  this.sanitizer.bypassSecurityTrustStyle('fill:rgb(' + r + ',100,' + r + ');' + 'stroke:rgb(' + r + ',100,' + r + ');');
    }


    getLines( data: any , options: any ) {

        const ret = [];
        const minMax = this.minMax( data );
        data.forEach( (elem, index ) => {
            const coord = this.toCoord(elem);
            const trans = this.transform(coord, options, minMax );
            const lines = this.toLine( trans, index, data.length );
            ret.push( ...lines);
        });
        return ret;
    }

    private minMax( data: any ) {
        const xs = [], ys = [];
        data.forEach(( elem ) => {
            elem.x.forEach( a => {  xs.push(a); });
            elem.y.forEach( b => { ys.push(b); });
        });
        return { minx : Math.min(...xs), maxx : Math.max(...xs), miny : Math.min(...ys), maxy : Math.max( ...ys) };
    }

    private transform( data: any, options: any , minMax : any ) {
        let minx, maxx, miny, maxy;
        minx = minMax.minx;
        maxx = minMax.maxx;
        miny = minMax.miny;
        maxy = minMax.maxy;
        return data.map((elem) => {
            const x = options.width / (maxx - minx) * (  elem.x - minx);
            const y = options.height / (maxy - miny) * ( maxy - elem.y );
            return {x: x, y: y};
        });

    }

    private validateFormat( data: any ) {
        if( data.x.length !== data.y.length ) {
            throw new Error('x et y n ont pas la même longueur');
        }
    }

    private toCoord( data: any  ) {
        const ret = [];
        data.x.forEach(( x, index ) => {
            ret.push({ x : x, y : data.y[index]});
        });
        return ret.sort((x, y ) => x.x < y.x ? -1 : 1 );
    }

    private toLine( ordered: any , index , sizeof ): any {
        const ret = [];
        for( let i = 0; i < ordered.length - 1; i++) {
            const left = new Node('hello');
            const right = new Node('world');
            left.x = ordered[i].x;
            left.y = ordered[i].y;
            right.x = ordered[i + 1].x;
            right.y = ordered[i + 1].y;
            ret.push( new Link(left, right, this.color(index, sizeof )));
        }
        return ret;
    }
}
