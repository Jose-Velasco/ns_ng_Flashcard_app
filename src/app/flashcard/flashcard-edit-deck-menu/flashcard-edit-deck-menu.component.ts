import { Component, OnInit, EventEmitter } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'ns-flashcard-edit-deck-menu',
  templateUrl: './flashcard-edit-deck-menu.component.html',
  styleUrls: ['./flashcard-edit-deck-menu.component.css']
})
export class FlashcardEditDeckMenuComponent implements OnInit {
    TitleOfDeck: string = '';
    dynamicParamSelectedDeckIndex: number;
    onsaveFlashcardDeckEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
      private pageRoute: PageRoute,
      private flashcardService: FlashcardService) { }

  ngOnInit() {
      this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
              this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
              this.TitleOfDeck = this.flashcardService.getAFlashcardDeck(this.dynamicParamSelectedDeckIndex).title;
          })
      })
  }

  onSaveFlashcardDeck(eventData: EventData) {
      this.onsaveFlashcardDeckEvent.emit(true);
  }

}
