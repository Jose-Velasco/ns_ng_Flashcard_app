import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-flashcard-select-deck',
  templateUrl: './flashcard-select-deck.component.html',
  styleUrls: ['./flashcard-select-deck.component.css']
})
export class FlashcardSelectDeckComponent implements OnInit, OnDestroy {
    flashcardDecksSub: Subscription;
    flashcardDecks: FlashcardDeck[];
    @Input() isListView = false;

  constructor(
      private flashcardService: FlashcardService,
      private router: RouterExtensions) { }

  ngOnInit() {
    this.flashcardDecks = this.flashcardService.getFlashcardDecks();
    this.flashcardDecksSub = this.flashcardService.flashcardsChanged
    .subscribe((flashcardsChanged: FlashcardDeck[]) => {
        this.flashcardDecks = flashcardsChanged;

    });

  }

  onFlashcardSelected(index: number) {
      if(!this.isListView) {
          this.router.navigate(['/view-flashcards', index], {transition: {name: 'fade'}});
      } else {
          this.router.navigate(['/edit-deck-menu', index], {transition: {name: 'slideLeft'}});
      }
  }

  ngOnDestroy() {
    this.flashcardDecksSub.unsubscribe();
  }

}
