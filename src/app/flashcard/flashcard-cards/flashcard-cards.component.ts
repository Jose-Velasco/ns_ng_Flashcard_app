import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as applicationModule from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label"
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';

declare var android: any;

@Component({
  selector: 'ns-flashcard-cards',
  templateUrl: './flashcard-cards.component.html',
  styleUrls: ['./flashcard-cards.component.css']
})
export class FlashcardCardsComponent implements OnInit, OnDestroy {
    cardFront = true;
    @Input() isEditMode = false;
    flashcardDeck: FlashcardDeck;
    flashcardDecksSub: Subscription;

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit() {
      this.flashcardDecksSub = this.flashcardService.flashcardsChanged
        .subscribe((flashcardDecks: FlashcardDeck[]) => {
            this.flashcardDeck = flashcardDecks[0];
      });
      this.flashcardDeck = this.flashcardService.getAFlashcardDeck(0);
  }

  onLabelLoad(args: EventData) {
      // this is the hack way of setting veritcal-align to center because it does not work on nativescript rn
      // it access native java function to center the label makesure to pass $event into argument of function call
      if (isAndroid) {
        const lbl = <Label>args.object;
        lbl.android.setGravity(17);
      }

  }

//   onTextFieldLoad(args: EventData) {
//     const TextFld = args.object;
//     TextFld.
//   }

  get android() {
    return isAndroid;
}

  onFlip() {
      // used to play the click sound when flexbox is clicked
      this.cardFront = !this.cardFront;
      if (isAndroid) {
          let decorView: any = applicationModule.android.startActivity.getWindow().getDecorView()
          decorView.playSoundEffect(android.view.SoundEffectConstants.CLICK);
      }

    //   if (this.flipped === false) {
    //       return;
    //   }

    //   var flipedTimeout = setTimeout(() => {
    //       this.flipped = false;
    //   }, 600);

    //   console.log("Card was fliped!");
    //   clearTimeout(flipedTimeout);
  }

  ngOnDestroy() {
      this.flashcardDecksSub.unsubscribe();
  }

}
