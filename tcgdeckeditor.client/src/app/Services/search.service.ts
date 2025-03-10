import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Card} from '../Models/Card';
import {SearchCardRequest} from '../Requests/SearchCardRequest';
import {SearchCardsResponse} from '../Responses/SearchCardsResponse';

const SEARCH_API = 'http://localhost:7033/api/search/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) { }

  searchCards(search: string): Observable<SearchCardsResponse>{
    const request: SearchCardRequest = {
      name: search,
    }

    return this.http.post<SearchCardsResponse>(
      SEARCH_API + 'search',
      request,
      httpOptions
    )
  }
}
