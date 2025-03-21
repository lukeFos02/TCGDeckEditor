import { Injectable } from '@angular/core';
import {GetDecksResponse} from '../Responses/GetDecksResponse';

const USER_KEY = 'auth-user';
const DECK_KEY = 'deck';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveDeck(deck: GetDecksResponse){
    window.sessionStorage.removeItem(DECK_KEY);
    window.sessionStorage.setItem(DECK_KEY, JSON.stringify(deck));
  }

  public getDeck(): any {
    const deck = window.sessionStorage.getItem(DECK_KEY);
    if (deck) {
      return JSON.parse(deck);
    }
    else {
      return {};
    }

  }

  public removeDeck(){
    window.sessionStorage.removeItem(DECK_KEY);
  }
}
