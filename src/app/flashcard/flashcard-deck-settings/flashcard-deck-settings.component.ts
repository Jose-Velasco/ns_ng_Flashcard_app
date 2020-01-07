import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'ns-flashcard-deck-settings',
  templateUrl: './flashcard-deck-settings.component.html',
  styleUrls: ['./flashcard-deck-settings.component.css']
})
export class FlashcardDeckSettingsComponent implements OnInit, OnDestroy {
    hasCreatedDeck: boolean = false;
    flashcardDecksSub: Subscription;
    flashcardDecks: FlashcardDeck[];

    constructor(private flashcardService: FlashcardService) { }

    ngOnInit() {
        this.flashcardDecks = this.flashcardService.getFlashcardDecks();
        this.flashcardDecksSub = this.flashcardService._flashcardsChanged
        .subscribe((flashcardsChanged: FlashcardDeck[]) => {
            this.flashcardDecks = flashcardsChanged;
            this.hasCreatedDeck = flashcardsChanged.length > 0 ? true : false;
        });
        this.hasCreatedDeck = this.flashcardDecks.length > 0;
    }

    ngOnDestroy() {
        this.flashcardDecksSub.unsubscribe();
      }
}
