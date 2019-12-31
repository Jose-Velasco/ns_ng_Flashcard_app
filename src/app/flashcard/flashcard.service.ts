import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FlashcardDeck } from "./flashcardDeck.model";

@Injectable ({providedIn: 'root'})
export class FlashcardService {
    _flashcardsChanged = new Subject<FlashcardDeck[]>();
    private flashcardDecksArray: FlashcardDeck[] = [];

    setFlascardDesks(flashcardDecks: FlashcardDeck[]) {
        this.flashcardDecksArray = flashcardDecks;
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

    getFlashcardDecks() {
        return this.flashcardDecksArray.slice();
    }
    getAFlashcardDeck(index: number) {
        return this.flashcardDecksArray[index];
    }

    updateFlashcardDecks(index: number, newFlashcardDeck: FlashcardDeck) {
        this.flashcardDecksArray[index] = newFlashcardDeck;
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

}
