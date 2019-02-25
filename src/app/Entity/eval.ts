import { Eval } from '../model/eval';
import { v4 as uuid } from 'uuid';

export class EvalEntity implements Eval {

    public id: string;
    public date: Date;

    constructor( public value: number, public idFactor: string , public factorName: string ) {
        this.id = uuid();
        this.date = new Date();
    }

    public isToday() {
        const now = new Date();
        return this.date.getFullYear() === now.getFullYear()
            && this.date.getMonth() === now.getMonth()
            && this.date.getDay() === now.getDay()
        ;
    }
}
