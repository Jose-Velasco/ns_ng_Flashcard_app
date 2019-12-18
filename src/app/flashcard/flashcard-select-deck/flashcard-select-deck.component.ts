import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ns-flashcard-select-deck',
  templateUrl: './flashcard-select-deck.component.html',
  styleUrls: ['./flashcard-select-deck.component.css']
})
export class FlashcardSelectDeckComponent implements OnInit {
    @Input() isListView = false;

  constructor() { }

  ngOnInit() {
  }

}
