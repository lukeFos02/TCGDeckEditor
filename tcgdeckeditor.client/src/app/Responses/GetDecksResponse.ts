import {Card} from '../Models/Card';

export class GetDecksResponse{
  deckId: number | undefined;
  deckName!: string;
  leader: Card | undefined;
  deckContents: Card[] | undefined;
}
