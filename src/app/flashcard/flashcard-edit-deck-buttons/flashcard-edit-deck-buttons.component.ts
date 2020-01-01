import { Component, OnInit, Input } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { EditFlashcardService } from '../edit-flashcard.service';

@Component({
  selector: 'ns-flashcard-edit-deck-buttons',
  templateUrl: './flashcard-edit-deck-buttons.component.html',
  styleUrls: ['./flashcard-edit-deck-buttons.component.css']
})
export class FlashcardEditDeckButtonsComponent implements OnInit {
    @Input() isEditModeButtons = false;
    @Input() IndexDeckSelected: number;

    constructor(private flashcardService: FlashcardService,
        private editFlashcardService: EditFlashcardService) { }

    ngOnInit() {
    }

    onAddCard() {
        this.editFlashcardService.addCard();
        console.log("card button pressed");
    }

    onShuffleDeck() {
        console.log(this.flashcardService.getAFlashcardDeck(this.IndexDeckSelected));
    }

}
