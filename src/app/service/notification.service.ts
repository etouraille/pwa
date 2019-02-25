import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient ) { }

  public subscribe( sub ) {
    this.http.post('http://localhost/api/push/subscribe', sub).subscribe( data => {
      console.log( 'subscribed datat', data, sub );
    });
  }
}
