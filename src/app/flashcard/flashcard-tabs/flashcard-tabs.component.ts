import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'ns-flashcard-tabs',
  templateUrl: './flashcard-tabs.component.html',
  styleUrls: ['./flashcard-tabs.component.css']
})
export class FlashcardTabsComponent implements OnInit {
    isLoading = false;

  constructor(
      private router: RouterExtensions,
      private active: ActivatedRoute,
      private page: Page,
      private flashcardSerivce: FlashcardService) { }

  ngOnInit() {
      this.isLoading = true;
      this.flashcardSerivce.fetchFlashcardDecks().subscribe(res => {
          this.isLoading = false;
          this.loadTabRoutes();
      }, err => {
          this.isLoading = false;
          console.log(err);
          this.loadTabRoutes();
      })

      this.page.actionBarHidden = true;
  }

  private loadTabRoutes() {
      setTimeout(() => {
        this.router.navigate([{outlets: {selectDeckMenu: ['select-Deck-Menu'], deckSettings: ['deck-Settings']}}], {
            relativeTo: this.active
        });
      }, 10);
  }

}
