import { Card } from "./card.model";

export class FlashcardDeck {
    constructor(
        public title: string,
        public _cards: Card[]
    ) {}
}
