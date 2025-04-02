import {Component, OnInit} from '@angular/core';
import {Card} from '../Models/Card';
import {SearchService} from '../Services/search.service';
import {SearchCardsResponse} from '../Responses/SearchCardsResponse';
import {SaveDeckRequest} from '../Requests/SaveDeckRequest';
import {StorageService} from '../Services/storage.service';
import {DeckService} from '../Services/deck.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GetDecksResponse} from '../Responses/GetDecksResponse';
import {MatButton, MatIconButton} from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrl: './card-search.component.scss',
})
export class CardSearchComponent implements OnInit {

  filteredCardList: SearchCardsResponse | undefined;
  deckList: Card[] = [];
  displayedCards: Card[] = [];
  deckCount: number = 0;
  leader!: Card;
  deckData!: GetDecksResponse
  deckName: string | undefined;
  form: any = {
    name: null,
    color: null,
    counter: null,
    cost: null,
    power: null,
    family: null,
  }
  colors: string[] = ['Red', 'Blue', 'Green', 'Black', 'Yellow', 'Purple'];
  costs: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  counters: number[] = [0, 1000, 2000];
  powers: number[] = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000];

  constructor(private searchService: SearchService,
              private storageService: StorageService,
              private decksService: DeckService,
              private route: ActivatedRoute,
              private router: Router,
              private clipboard: Clipboard,) {
  }

  ngOnInit() {
    this.deckData = this.storageService.getDeck();
    if (!this.deckData) {
      this.router.navigate(['']);
    }
    else{
      this.deckName = this.deckData.deckName
      this.leader = this.deckData.leader!;
      (<HTMLInputElement>document.getElementById('deckName')).value = this.deckData.deckName;
      for (const card of this.deckData.deckContents!) {
        this.addCard(card);
      }
      this.storageService.removeDeck()
    }
  }

  filterResults() {
    console.log(this.form)
    const { name, color, counter, cost, power, family } = this.form
    this.searchService.searchCards(name, color, counter, cost, power, family).subscribe({
      next: data => {
        this.filteredCardList = data
      }
    })
    // this.filteredCardList = new SearchCardsResponse();
    // this.filteredCardList = {
    //   "page": 1,
    //   "limit": 25,
    //   "total": 40,
    //   "totalPages": 2,
    //   "data": [{
    //     "id": "ST03-008_p4",
    //     "code": "ST03-008",
    //     "rarity": "C",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-008_p4.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-008_p4.png?241220"
    //     },
    //     "cost": 1,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 1000,
    //     "counter": "-",
    //     "color": "Blue",
    //     "family": "The Seven Warlords of the Sea/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
    //     "trigger": "",
    //     "set": {
    //       "name": "-Blue Donquixote Doflamingo- [ST-17]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "ST17-002",
    //     "code": "ST17-002",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST17-002.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST17-002.png?241220"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "1000",
    //     "color": "Blue",
    //     "family": "The Seven Warlords of the Sea/Heart Pirates",
    //     "ability": "[On Play] You may return 1 of your Characters to the owner's hand: If your Leader has the {The Seven Warlords of the Sea} type, return up to 1 Character with a cost of 4 or less to the owner's hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-Blue Donquixote Doflamingo- [ST-17]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP04-087",
    //     "code": "OP04-087",
    //     "rarity": "C",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP04-087.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP04-087.png"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 7000,
    //     "counter": "1000",
    //     "color": "Black",
    //     "family": "Dressrosa/Heart Pirates",
    //     "ability": "-",
    //     "trigger": "",
    //     "set": {
    //       "name": "-KINGDOMS OF INTRIGUE- [OP04]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-027",
    //     "code": "OP05-027",
    //     "rarity": "UC",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-027.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-027.png"
    //     },
    //     "cost": 1,
    //     "attribute": {
    //       "name": "Wisdom",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type05.png"
    //     },
    //     "power": 2000,
    //     "counter": "1000",
    //     "color": "Green",
    //     "family": "Donquixote Pirates",
    //     "ability": "[Activate: Main] You may trash this Character: Rest up to 1 of your opponent's Characters with a cost of 3 or less.",
    //     "trigger": "",
    //     "set": {
    //       "name": "OP-05"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-069",
    //     "code": "OP05-069",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069.png"
    //     },
    //     "cost": 3,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[When Attacking] If your opponent has more DON!! cards on their field than you, look at 5 cards from the top of your deck; reveal up to 1 {Heart Pirates} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "OP-05"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-069_p1",
    //     "code": "OP05-069",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p1.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p1.png"
    //     },
    //     "cost": 3,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[When Attacking] If your opponent has more DON!! cards on their field than you, look at 5 cards from the top of your deck; reveal up to 1 {Heart Pirates} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "OP-05"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-069_p2",
    //     "code": "OP05-069",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p2.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p2.png"
    //     },
    //     "cost": 3,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[When Attacking] If your opponent has more DON!! cards on their field than you, look at 5 cards from the top of your deck; reveal up to 1 {Heart Pirates} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "OP-05"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-095",
    //     "code": "OP05-095",
    //     "rarity": "C",
    //     "type": "EVENT",
    //     "name": "Dragon Claw",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-095.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-095.png"
    //     },
    //     "cost": 2,
    //     "attribute": {
    //       "image": "https://en.onepiece-cardgame.comundefined"
    //     },
    //     "power": null,
    //     "counter": "-",
    //     "color": "Black",
    //     "family": "Dressrosa/Revolutionary Army",
    //     "ability": "[Counter] Up to 1 of your Leader or Character cards gains +4000 power during this battle. Then, if you have 15 or more cards in your trash, K.O. up to 1 of your opponent's Characters with a cost of 4 or less.",
    //     "trigger": "",
    //     "set": {
    //       "name": "OP-05"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP02-035",
    //     "code": "OP02-035",
    //     "rarity": "C",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-035.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-035.png"
    //     },
    //     "cost": 2,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 3000,
    //     "counter": "1000",
    //     "color": "Green",
    //     "family": "FILM/Supernovas/Heart Pirates",
    //     "ability": "[Activate: Main] ➀ (You may rest the specified number of DON!! cards in your cost area.) You may return this Character to the owner's hand: Play up to 1 Character with a cost of 3 from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-PARAMOUNT WAR- [OP02]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP02-035_p1",
    //     "code": "OP02-035",
    //     "rarity": "C",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-035_p1.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-035_p1.png"
    //     },
    //     "cost": 2,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 3000,
    //     "counter": "1000",
    //     "color": "Green",
    //     "family": "FILM/Supernovas/Heart Pirates",
    //     "ability": "[Activate: Main] ➀ (You may rest the specified number of DON!! cards in your cost area.) You may return this Character to the owner's hand: Play up to 1 Character with a cost of 3 from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "Included in Online Regional Participation Pack Vol.1"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP07-047",
    //     "code": "OP07-047",
    //     "rarity": "R",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-047.png?240831",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-047.png?240831"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 4000,
    //     "counter": "2000",
    //     "color": "Blue",
    //     "family": "The Seven Warlords of the Sea/Heart Pirates",
    //     "ability": "[Activate: Main] You may return this Character to theowner's hand: If your opponent has 6 or more cards in theirhand, your opponent places 1 card from their hand at thebottom of their deck.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-500 YEARS IN THE FUTURE- [OP-07]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP07-047_p1",
    //     "code": "OP07-047",
    //     "rarity": "R",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-047_p1.png?240831",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-047_p1.png?240831"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 4000,
    //     "counter": "2000",
    //     "color": "Blue",
    //     "family": "The Seven Warlords of the Sea/Heart Pirates",
    //     "ability": "[Activate: Main] You may return this Character to theowner's hand: If your opponent has 6 or more cards in theirhand, your opponent places 1 card from their hand at thebottom of their deck.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-500 YEARS IN THE FUTURE- [OP-07]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "ST10-010_p2",
    //     "code": "ST10-010",
    //     "rarity": "TR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST10-010_p2.png?240831",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST10-010_p2.png?240831"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "1000",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you mayrest this card to make it the new target of the attack.)<br>[OnPlay] DON!! －1 (You may return the specified number ofDON!! cards from your field to your DON!! deck.): If youropponent has 7 or more cards in their hand, trash 2 cardsfrom your opponent's hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-500 YEARS IN THE FUTURE- [OP-07]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP01-002",
    //     "code": "OP01-002",
    //     "rarity": "L",
    //     "type": "LEADER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002.png"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Red/Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Activate: Main] [Once Per Turn] ➁ (You may rest the specified number of DON!! cards in your cost area.): If you have 5 Characters, return 1 of your Characters to the owner's hand. Then, play up to 1 Character with a cost of 5 or less from your hand that is a different color than the returned Character.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ROMANCE DAWN- [OP01]"
    //     },
    //     "notes": [{
    //       "name": "Errata Card",
    //       "url": "https://en.onepiece-cardgame.com//rules/errata_card/#errata_05"
    //     }]
    //   }, {
    //     "id": "OP01-002_p1",
    //     "code": "OP01-002",
    //     "rarity": "L",
    //     "type": "LEADER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002_p1.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002_p1.png"
    //     },
    //     "cost": 4,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Red/Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Activate: Main] [Once Per Turn] ➁ (You may rest the specified number of DON!! cards in your cost area.): If you have 5 Characters, return 1 of your Characters to the owner's hand. Then, play up to 1 Character with a cost of 5 or less from your hand that is a different color than the returned Character.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ROMANCE DAWN- [OP01]"
    //     },
    //     "notes": [{
    //       "name": "Errata Card",
    //       "url": "https://en.onepiece-cardgame.com//rules/errata_card/#errata_05"
    //     }]
    //   }, {
    //     "id": "OP01-047",
    //     "code": "OP01-047",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047.png"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 6000,
    //     "counter": "-",
    //     "color": "Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)<br>[On Play] You may return 1 Character to your hand: Play up to 1 Character card with a cost of 3 or less from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ROMANCE DAWN- [OP01]"
    //     },
    //     "notes": [{
    //       "name": "Errata Card",
    //       "url": "https://en.onepiece-cardgame.com//rules/errata_card/#errata_05"
    //     }]
    //   }, {
    //     "id": "OP01-047_p1",
    //     "code": "OP01-047",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p1.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p1.png"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 6000,
    //     "counter": "-",
    //     "color": "Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)<br>[On Play] You may return 1 Character to your hand: Play up to 1 Character card with a cost of 3 or less from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ROMANCE DAWN- [OP01]"
    //     },
    //     "notes": [{
    //       "name": "Errata Card",
    //       "url": "https://en.onepiece-cardgame.com//rules/errata_card/#errata_05"
    //     }]
    //   }, {
    //     "id": "OP01-047_p2",
    //     "code": "OP01-047",
    //     "rarity": "SP CARD",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p2.png",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p2.png"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 6000,
    //     "counter": "-",
    //     "color": "Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)<br>[On Play] You may return 1 of your Characters to the owner's hand: Play up to 1 Character card with a cost of 3 or less from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-KINGDOMS OF INTRIGUE- [OP04]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP09-030",
    //     "code": "OP09-030",
    //     "rarity": "UC",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-030.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-030.png?241220"
    //     },
    //     "cost": 3,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 4000,
    //     "counter": "1000",
    //     "color": "Green",
    //     "family": "ODYSSEY/Supernovas/Heart Pirates",
    //     "ability": "[On Play] You may return 1 of your Characters to the owner's\n                    hand: Play up to 1 {ODYSSEY} type Character card with a cost\n                    of 3 or less other than [Trafalgar Law] from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-EMPERORS IN THE NEW WORLD- [OP-09]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP09-069",
    //     "code": "OP09-069",
    //     "rarity": "R",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-069.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-069.png?241220"
    //     },
    //     "cost": 1,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 2000,
    //     "counter": "1000",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[On Play] Look at 4 cards from the top of your deck; reveal\n                    up to 1 {Straw Hat Crew} or {Heart Pirates} type card with a\n                    cost of 2 or more and add it to your hand. Then, place the\n                    rest at the bottom of your deck in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-EMPERORS IN THE NEW WORLD- [OP-09]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP09-069_p1",
    //     "code": "OP09-069",
    //     "rarity": "R",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-069_p1.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-069_p1.png?241220"
    //     },
    //     "cost": 1,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 2000,
    //     "counter": "1000",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[On Play] Look at 4 cards from the top of your deck; reveal\n                    up to 1 {Straw Hat Crew} or {Heart Pirates} type card with a\n                    cost of 2 or more and add it to your hand. Then, place the\n                    rest at the bottom of your deck in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-EMPERORS IN THE NEW WORLD- [OP-09]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP01-047_p3",
    //     "code": "OP01-047",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p3.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p3.png?241220"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 6000,
    //     "counter": "-",
    //     "color": "Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may\n                    rest this card to make it the new target of the attack.)<br>[On\n                    Play] You may return 1 of your Characters to the owner's\n                    hand: Play up to 1 Character card with a cost of 3 or less\n                    from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ONE PIECE CARD THE BEST- [PRB-01]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP01-047_p4",
    //     "code": "OP01-047",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p4.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p4.png?241220"
    //     },
    //     "cost": 5,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 6000,
    //     "counter": "-",
    //     "color": "Green",
    //     "family": "Supernovas/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may\n                    rest this card to make it the new target of the attack.)<br>[On\n                    Play] You may return 1 of your Characters to the owner's\n                    hand: Play up to 1 Character card with a cost of 3 or less\n                    from your hand.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ONE PIECE CARD THE BEST- [PRB-01]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "OP05-069_p3",
    //     "code": "OP05-069",
    //     "rarity": "SR",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p3.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-069_p3.png?241220"
    //     },
    //     "cost": 3,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 5000,
    //     "counter": "-",
    //     "color": "Purple",
    //     "family": "Heart Pirates",
    //     "ability": "[When Attacking] If your opponent has more DON!! cards on\n                    their field than you, look at 5 cards from the top of your\n                    deck; reveal up to 1 {Heart Pirates} type card and add it to\n                    your hand. Then, place the rest at the bottom of your deck\n                    in any order.",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ONE PIECE CARD THE BEST- [PRB-01]"
    //     },
    //     "notes": []
    //   }, {
    //     "id": "ST03-008_p5",
    //     "code": "ST03-008",
    //     "rarity": "C",
    //     "type": "CHARACTER",
    //     "name": "Trafalgar Law",
    //     "images": {
    //       "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-008_p5.png?241220",
    //       "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-008_p5.png?241220"
    //     },
    //     "cost": 1,
    //     "attribute": {
    //       "name": "Slash",
    //       "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
    //     },
    //     "power": 1000,
    //     "counter": "-",
    //     "color": "Blue",
    //     "family": "The Seven Warlords of the Sea/Heart Pirates",
    //     "ability": "[Blocker] (After your opponent declares an attack, you may\n                    rest this card to make it the new target of the attack.)",
    //     "trigger": "",
    //     "set": {
    //       "name": "-ONE PIECE CARD THE BEST- [PRB-01]"
    //     },
    //     "notes": []
    //   }]
    // } as unknown as SearchCardsResponse
  }

  addCard(item: Card) {
    let cardAmount = this.deckList.filter(x => x.code == item.code).length;
    if (cardAmount < 4 && item.type != 'LEADER') {
      this.deckCount += 1
      this.deckList.push(item);

      let check = this.displayedCards.find(x => x.id == item.id) !== undefined;
      if (!check) {
        this.displayedCards.push(item);
      }
    }
    if (item.type == 'LEADER') {
      this.leader = item;
    }
  }

  removeCard(card: Card) {
    for (let i of this.deckList) {
      if (i.code == card.code && i.id == card.id) {
        let index = this.deckList.indexOf(i);
        this.deckList.splice(index, 1);
        break;
      }
    }

    let artworkAmount = this.deckList.filter(x => x.id == card.id).length;
    if (artworkAmount == 0) {
      this.displayedCards = this.displayedCards.filter(x => x.id != card.id);
    }
    this.deckCount -= 1
  }

  clearDeck() {
    this.deckList = [];
    this.displayedCards = []
    this.deckCount = 0;
  }

  protected readonly length = length;

  findCardAmount(item: Card) {
    return this.deckList.filter(x => x.id == item.id).length;
  }

  saveDeck(deckName: string) {
    if (deckName) {
      if (this.storageService.isLoggedIn()){
        console.log('Creating Deck!');
        let userId = this.storageService.getUser().userId
        this.decksService.saveDeck(this.leader, this.deckList, userId, deckName).subscribe({
          next: (result) => {}
        })
      }
      else {
        console.error('Not logged in')
      }
    }
    else{
      console.error('No deck name found.')
    }
  }

  exportSimFormat(){
    var unique = this.deckList.filter((card, i, arr) => arr.findIndex(x => x.code === card.code) == i);
    var codes = []
    for (let card of unique) {
      codes.push(card.code);
    }

    var simString = `1x${this.leader.code}
`;
    for (let code of codes){
      var codeCount = this.deckList.filter(x => x.code == code).length;
      simString += `${codeCount}x${code}
`
    }

    this.clipboard.copy(simString);
  }
}
