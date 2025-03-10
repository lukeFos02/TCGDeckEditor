import {Card} from '../Models/Card';

export class SearchCardsResponse{
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
  totalPages: number | undefined;
  data: Card[] | undefined;
}
