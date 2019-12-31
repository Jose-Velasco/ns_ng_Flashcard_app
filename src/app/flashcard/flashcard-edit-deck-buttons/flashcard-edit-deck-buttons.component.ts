import { Component, OnInit, Input } from '@angular/core';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'ns-flashcard-edit-deck-buttons',
  templateUrl: './flashcard-edit-deck-buttons.component.html',
  styleUrls: ['./flashcard-edit-deck-buttons.component.css']
})
export class FlashcardEditDeckButtonsComponent implements OnInit {
    @Input() isEditModeButtons = false;
    @Input() IndexDeckSelected: number;

    constructor(private flashcardService: FlashcardService) { }

    ngOnInit() {
    }

    onShuffleDeck() {
        console.log(this.flashcardService.getAFlashcardDeck(this.IndexDeckSelected));
    }

}
