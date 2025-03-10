import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Card} from '../Models/Card';
import {SaveDeckRequest} from '../Requests/SaveDeckRequest';

const DECK_API = 'http://localhost:7033/api/deck/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http: HttpClient) { }

  saveDeck(leader: Card, deck: Card[], userId: number, deckName: string) {
    const request: SaveDeckRequest = {
      leader: leader,
      deck: deck,
      userId: userId,
      deckName: deckName,
    }

    return this.http.post<boolean>(
      DECK_API + 'save',
      request,
      httpOptions
    )
  }
}
