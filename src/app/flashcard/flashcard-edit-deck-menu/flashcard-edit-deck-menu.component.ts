import { Component, OnInit } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';

@Component({
  selector: 'ns-flashcard-edit-deck-menu',
  templateUrl: './flashcard-edit-deck-menu.component.html',
  styleUrls: ['./flashcard-edit-deck-menu.component.css']
})
export class FlashcardEditDeckMenuComponent implements OnInit {
    dynamicParamSelectedDeckIndex: number;

  constructor(private pageRoute: PageRoute) { }

  ngOnInit() {
      this.pageRoute.activatedRoute.subscribe(activatedRoute => {
          activatedRoute.paramMap.subscribe(paramMap => {
              this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
          })
      })
  }

}
