import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  public set(key: string , data: any): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  public get(key: string): any{
    const ret = window.localStorage.getItem(key);
    if(!ret ) {
      return [];
    } else {
      return JSON.parse(ret);
    }
  }
}
