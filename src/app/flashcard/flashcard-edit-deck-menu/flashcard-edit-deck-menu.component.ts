import { Component, OnInit, EventEmitter } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { EventData } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-flashcard-edit-deck-menu',
  templateUrl: './flashcard-edit-deck-menu.component.html',
  styleUrls: ['./flashcard-edit-deck-menu.component.css']
})
export class FlashcardEditDeckMenuComponent implements OnInit {
    dynamicParamSelectedDeckIndex: number;
    private onsaveFlashcardDeckEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private pageRoute: PageRoute) { }

  ngOnInit() {
      this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
              this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
          })
      })
  }

  onSaveFlashcardDeck(eventData: EventData) {
      this.onsaveFlashcardDeckEvent.emit(true);
  }

}
