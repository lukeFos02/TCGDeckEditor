import {Component, OnInit} from '@angular/core';
import {DeckService} from '../Services/deck.service';
import {StorageService} from '../Services/storage.service';
import {GetDecksResponse} from '../Responses/GetDecksResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrl: './my-decks.component.scss'
})
export class MyDecksComponent implements OnInit {

  decks!: GetDecksResponse[];

  constructor(private readonly deckService: DeckService,
              private readonly storageService: StorageService,
              private readonly router: Router) {

  }

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.deckService.loadDecks(this.storageService.getUser().userId)
        .subscribe(decks => this.decks = decks);
    }
    else {
      this.router.navigate(['']);
    }
  }

  editDeck(item: GetDecksResponse) {
    this.storageService.saveDeck(item);
    this.router.navigate(['SearchCards']);
  }
}
