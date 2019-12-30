import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ns-flashcard-edit-deck-buttons',
  templateUrl: './flashcard-edit-deck-buttons.component.html',
  styleUrls: ['./flashcard-edit-deck-buttons.component.css']
})
export class FlashcardEditDeckButtonsComponent implements OnInit {
    @Input() isEditModeButtons = false;

    constructor() { }

    ngOnInit() {
    }

}
