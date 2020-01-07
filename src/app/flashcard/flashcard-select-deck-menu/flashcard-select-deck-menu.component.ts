import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-flashcard-select-deck-menu',
  templateUrl: './flashcard-select-deck-menu.component.html',
  styleUrls: ['./flashcard-select-deck-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashcardSelectDeckMenuComponent implements OnInit, OnDestroy {
  menuTitle: string;
  flashcardsChangedSub: Subscription;
  constructor(
      private flashcardService: FlashcardService,
      private changeDectRef: ChangeDetectorRef) { }

  ngOnInit() {
      this.flashcardsChangedSub = this.flashcardService.flashcardsChanged.subscribe(flashcardDecks => {
          if (this.flashcardService.currentFlashcardDeckLength != 0) {
              this.menuTitle = "Select Flashcards";
          } else {
            this.menuTitle = "Please create a deck";
          }
      });
      this.setTitle();

  }

  setTitle() {
    if (this.flashcardService.currentFlashcardDeckLength != 0) {
        this.menuTitle = "Select Flashcards";
    } else {
        this.menuTitle = "Please create a deck";
    }

  }

  ngOnDestroy() {
      this.flashcardsChangedSub.unsubscribe();
  }

}
