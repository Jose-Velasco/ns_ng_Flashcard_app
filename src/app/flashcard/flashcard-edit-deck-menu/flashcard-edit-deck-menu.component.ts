import { Component, OnInit, EventEmitter, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-flashcard-edit-deck-menu',
  templateUrl: './flashcard-edit-deck-menu.component.html',
  styleUrls: ['./flashcard-edit-deck-menu.component.css']
})
export class FlashcardEditDeckMenuComponent implements OnInit, OnDestroy, AfterViewChecked {
    titleOfDeck: string = '';
    menuEditTitle: string = "Edit Deck Menu";
    dynamicParamSelectedDeckIndex: number;
    onsaveFlashcardDeckEvent: EventEmitter<boolean> = new EventEmitter();
    pagerouterSub: Subscription;
    hasCardInDeck: boolean;

  constructor(
      private pageRoute: PageRoute,
      private flashcardService: FlashcardService,
      private router: RouterExtensions,
      private changeDectRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.pagerouterSub = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
              this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
              if (this.dynamicParamSelectedDeckIndex != -1) {
                  this.titleOfDeck = this.flashcardService.getAFlashcardDeck(this.dynamicParamSelectedDeckIndex).title;
              }
          })
      })
  }

  setEditMenuTitle(menuTitle: string) {
    this.menuEditTitle = menuTitle;
    // this was causeing the formgruop to to not be instantiated
    // might need ot be changed for possable settting of title erros
    // this.changeDectRef.detectChanges();
  }

  onSaveFlashcardDeck(eventData: EventData) {
      this.onsaveFlashcardDeckEvent.emit(true);
  }

  changeIfCardsInDeck(isCardsInDeck: boolean) {
      this.hasCardInDeck = isCardsInDeck;
  }

  onDeleteFlashcardDeck() {
      this.flashcardService.deleteFlashcardDeck(this.dynamicParamSelectedDeckIndex);
      this.router.backToPreviousPage();
  }

  onCancelCreateDeck() {
    this.router.navigate(['/tabs'], {clearHistory: true});
  }

  ngAfterViewChecked() {
      if (this.hasCardInDeck) {
          this.changeDectRef.detectChanges();
      }
  }

  ngOnDestroy() {
    this.pagerouterSub.unsubscribe();
  }

}
