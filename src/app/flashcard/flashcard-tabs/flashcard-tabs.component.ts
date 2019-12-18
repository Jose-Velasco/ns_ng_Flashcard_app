import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-flashcard-tabs',
  templateUrl: './flashcard-tabs.component.html',
  styleUrls: ['./flashcard-tabs.component.css']
})
export class FlashcardTabsComponent implements OnInit {

  constructor(
      private router: RouterExtensions,
      private active: ActivatedRoute,
      private page: Page) { }

  ngOnInit() {
      this.router.navigate([{outlets: {selectDeckMenu: ['select-Deck-Menu'], deckSettings: ['deck-Settings']}}], {
          relativeTo: this.active
      });
      this.page.actionBarHidden = true;
  }

}
