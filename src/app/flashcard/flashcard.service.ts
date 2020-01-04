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

    addFlashcardDeck(flashcardDeck: FlashcardDeck) {
        this.flashcardDecksArray.push(flashcardDeck);
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

    deleteFlashcardDeck(index: number) {
        this.flashcardDecksArray.splice(index, 1);
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

    updateFlashcardDecks(index: number, newFlashcardDeck: FlashcardDeck) {
        this.flashcardDecksArray[index] = newFlashcardDeck;
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

}
