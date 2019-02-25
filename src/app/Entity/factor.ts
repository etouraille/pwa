import { Factor } from '../model/factor';
import { v4 as uuid } from 'uuid';

export class FactorEntity implements Factor {

    public id: string;
    public display: boolean;

    constructor(public value: string) {
        this.id = uuid();
        this.display = true;
    }
}
