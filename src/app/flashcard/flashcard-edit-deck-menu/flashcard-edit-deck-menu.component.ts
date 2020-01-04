import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-flashcard-edit-deck-menu',
  templateUrl: './flashcard-edit-deck-menu.component.html',
  styleUrls: ['./flashcard-edit-deck-menu.component.css']
})
export class FlashcardEditDeckMenuComponent implements OnInit, OnDestroy {
    TitleOfDeck: string = '';
    dynamicParamSelectedDeckIndex: number;
    onsaveFlashcardDeckEvent: EventEmitter<boolean> = new EventEmitter();
    pagerouterSub: Subscription;

  constructor(
      private pageRoute: PageRoute,
      private flashcardService: FlashcardService,
      private router: RouterExtensions) { }

  ngOnInit() {
    this.pagerouterSub = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
              this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
              if (this.dynamicParamSelectedDeckIndex != -1) {
                  this.TitleOfDeck = this.flashcardService.getAFlashcardDeck(this.dynamicParamSelectedDeckIndex).title;
              }
          })
      })
  }

  onSaveFlashcardDeck(eventData: EventData) {
      this.onsaveFlashcardDeckEvent.emit(true);
  }

  onDeleteFlashcardDeck() {
      this.flashcardService.deleteFlashcardDeck(this.dynamicParamSelectedDeckIndex);
      this.router.backToPreviousPage();
  }

  onCancelCreateDeck() {
    this.router.navigate(['/tabs'], {clearHistory: true});
  }

  ngOnDestroy() {
    this.pagerouterSub.unsubscribe();
  }

}
