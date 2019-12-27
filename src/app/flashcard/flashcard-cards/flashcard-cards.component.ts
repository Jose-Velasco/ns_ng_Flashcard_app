import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as applicationModule from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label"
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { TextView } from 'tns-core-modules/ui/text-view';

declare var android: any;

@Component({
  selector: 'ns-flashcard-cards',
  templateUrl: './flashcard-cards.component.html',
  styleUrls: ['./flashcard-cards.component.css']
})
export class FlashcardCardsComponent implements OnInit, OnDestroy {
    cardFront = null;
    indexSelected: number;
    @Input() isEditMode = false;
    flashcardDeck: FlashcardDeck;
    flashcardDecksSub: Subscription;
    cardForm: FormGroup;
    @ViewChild('instructionsEl', {static: false}) instructionsEl: ElementRef<TextField>;
    @ViewChild('questionEl', {static: false}) questionEl: ElementRef<TextView>;
    @ViewChild('answerEl', {static: false}) answerEl: ElementRef<TextView>;

    get cardsControl() {
        return (this.cardForm.get('cards') as FormArray).controls;
    }

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit() {
      this.flashcardDecksSub = this.flashcardService.flashcardsChanged
        .subscribe((flashcardDecks: FlashcardDeck[]) => {
            this.flashcardDeck = flashcardDecks[0];
      });
      this.flashcardDeck = this.flashcardService.getAFlashcardDeck(0);

      this.initCardForm();
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

  onSelectCard(index: number) {
    // this.indexSelected = this.indexSelected != null ? null : index;
    if (this.isEditMode) {
        if (this.indexSelected != null) {
            this.indexSelected = null;
        } else {
            this.indexSelected = index;
        }

        const selectedCardControl = (<FormArray>this.cardForm.get('cards'));
        this.flashcardDeck._cards[index].instruction = selectedCardControl.at(index).get('instruction').value;
        this.flashcardDeck._cards[index].question = selectedCardControl.at(index).get('question').value;
        this.flashcardDeck._cards[index].answer = selectedCardControl.at(index).get('answer').value;
    }

  }

  private initCardForm() {
      let flashcardCards = new FormArray([]);
      //add if to make sure there is cards and not empty
      for (let card of this.flashcardDeck._cards) {
          flashcardCards.push(new FormGroup({
            instruction: new FormControl(card.instruction, {updateOn: "change"}),
            question: new FormControl(card.question, {updateOn: "change"}),
            answer: new FormControl(card.answer, { updateOn: "change"})
          }));
      }

      this.cardForm = new FormGroup({
          cards: flashcardCards
      });

  }


  ngOnDestroy() {
      this.flashcardDecksSub.unsubscribe();
  }

}
