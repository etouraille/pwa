import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    private load() {
        const dates = [];
        const keys = Object.keys(window.localStorage);
        keys.forEach( key => {
            if( key !== 'factors') {
                dates.push( { rawDate : key , json : JSON.parse(window.localStorage.getItem( key))});
            }
        });
        const factors = JSON.parse(window.localStorage.getItem('factors' ));

        const inter = {};
        dates.forEach( elem => {
            elem.json.forEach( a => {
                if( inter[a.idFactor] === undefined ) {
                    inter[a.idFactor] = { x: [], y : []};
                }
                inter[a.idFactor].x.push(parseInt(elem.rawDate));
                inter[a.idFactor].y.push(parseFloat(a.value));
            });
        });

        const data = [];
        Object.keys( inter).map( key => {
            data.push( {x : inter[key].x, y : inter[key].y, label : this.getLabel(key, factors ) });
        });

        return data;

    }

    private getLabel(id, factors ) {
        let ret = null;
        factors.forEach((elem) => {
            if(elem.id === id ) {
                ret = elem.value;
            }
        });
        return ret;
    }

    getFilters() {
        const data = this.load();
        const ret = [];
        data.forEach( (elem, index ) => {
            ret.push( { id : index , filter : elem.label });
        });
        return ret;
    }


    all() {
        return this.load();
    }

    filter( indexes: any ) {
        const data = this.load();
        const ret = [];
        indexes.forEach( index => {
            ret.push(data[parseInt(index)]);
        });
        return ret;
    }
}
