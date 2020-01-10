import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditFlashcardService } from '../edit-flashcard.service';
import { Subscription } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-create-deck-type',
  templateUrl: './create-deck-type.component.html',
  styleUrls: ['./create-deck-type.component.css']
})
export class CreateDeckTypeComponent implements OnInit, OnDestroy {
    isCreatingNewDeck: boolean;
    editFlashcardServiceSub: Subscription;
    enableCreateModeParams: number;

  constructor(
      private editFlashcardService: EditFlashcardService,
      private router: RouterExtensions) { }

  ngOnInit() {
  }

  onCreateTextFlashcardDeck() {
    this.isCreatingNewDeck = true;
    this.enableCreateModeParams = -1;
    this.editFlashcardService.enableCreateNewFlashcardDeck(this.isCreatingNewDeck);
    this.router.navigate(["edit-deck-menu", this.enableCreateModeParams], {clearHistory: true});
  }

  ngOnDestroy() {
  }

}
