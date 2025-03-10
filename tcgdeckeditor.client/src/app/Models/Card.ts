export class Card {
  id!: string;
  code!: string;
  rarity!: string;
  type!: string;
  name!: string;
  images!: Images
  cost!: number;
  attribute!: Attribute;
  power!: number;
  counter!: number;
  color!: string;
  family!: string;
  ability!: string;
  trigger!: string;
  set!: Set;
}

class Images{
  small!: string;
  large!: string;
}

class Attribute{
  name!: string;
  image!: string;
}

class Set{
  name!: string;
}
