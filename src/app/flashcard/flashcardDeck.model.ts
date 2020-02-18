import { Card } from "./card.model";

export class FlashcardDeck {
    constructor(
        public pk: number,
        public title: string,
        public _cards: Card[]
    ) {}
}
