import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { EditFlashcardService } from '../edit-flashcard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-flashcard-edit-deck-buttons',
  templateUrl: './flashcard-edit-deck-buttons.component.html',
  styleUrls: ['./flashcard-edit-deck-buttons.component.css']
})
export class FlashcardEditDeckButtonsComponent implements OnInit, OnDestroy {
    @Input() isEditModeButtons = false;
    @Input() IndexDeckSelected: number;
    editFlashcardSerSub: Subscription;
    isCardSelected: boolean = false;

    constructor(private flashcardService: FlashcardService,
        private editFlashcardService: EditFlashcardService) { }

    ngOnInit() {
        this.editFlashcardSerSub = this.editFlashcardService.aCardWasSelectedObserv.subscribe((isACardSeleceted: boolean) => {
            this.isCardSelected = isACardSeleceted;
        });
    }

    onAddCard(addAction: string) {
        if (!this.isCardSelected) {
            this.editFlashcardService.updateDeckAction(addAction);
        }
    }

    onDeleteACard(deleteAction: string) {
        if (this.isCardSelected) {
            this.editFlashcardService.updateDeckAction(deleteAction);
        }
    }

    onShuffleDeck() {
        console.log(this.flashcardService.getAFlashcardDeck(this.IndexDeckSelected));
    }

    ngOnDestroy() {
        this.editFlashcardSerSub.unsubscribe();
    }

}
