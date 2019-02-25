import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactorService {

  public factors: { value: string }[] = [];

  constructor() {}

  add( factor: string ) {
    this.factors.push({ value: factor });
  }

  remove(id: number) {
    this.factors.splice( id, 1 );
  }
}
