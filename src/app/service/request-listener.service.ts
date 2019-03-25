import { Injectable } from '@angular/core';
import {AddMessage} from '../action/message.action';
import {Store} from '@ngrx/store';
import {Message} from '../model/message';

interface Payload {
    message: Message|null;
}
@Injectable({
  providedIn: 'root'
})
export class RequestListenerService {

  public actions = [
      { route: /api\/message\/send/, method : 'POST', action : AddMessage, payload : 'message' }
  ];

  constructor(private store: Store<any>) {
      console.log( 'constructor called');
      if ('serviceWorker' in navigator ) {
          const channel = new BroadcastChannel('sw-messages');
          channel.addEventListener('message', (event) => {
              console.log(JSON.parse(event.data) );
              this.processRequest(JSON.parse(event.data));
          });
      }
  }

  private processRequest(request: any): void {
    this.actions.forEach( (action) => {
        console.log( request )
        if (request.url.match(action.route) && request.method === action.method ) {
            const constructor = action.action;
            const payload: Payload = { message: null };
            payload[action.payload] = request.body;
            console.log( 'dispatched' );
            this.store.dispatch(new constructor( payload ));
        }
    });
  }
}
