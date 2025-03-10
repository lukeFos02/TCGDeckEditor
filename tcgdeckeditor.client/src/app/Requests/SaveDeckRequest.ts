import {Card} from '../Models/Card';

export class SaveDeckRequest{
  leader!: Card
  deck!: Card[]
  userId!: number
  deckName!: string
}
