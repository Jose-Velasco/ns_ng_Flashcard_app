import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import * as applicationModule from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label"
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { TextView } from 'tns-core-modules/ui/text-view';
import { EditFlashcardService } from '../edit-flashcard.service';

declare var android: any;

@Component({
  selector: 'ns-flashcard-cards',
  templateUrl: './flashcard-cards.component.html',
  styleUrls: ['./flashcard-cards.component.css']
})
export class FlashcardCardsComponent implements OnInit, OnDestroy {
    @Input() onsaveFlashcardDeckEvent: EventEmitter<boolean>;
    @Input() onAddCardEvent: EventEmitter<boolean>; // delte later not being used??
    saveFlashcardDeckSub: Subscription;
    @Input() flashcardDeckIndexSelected: number;
    cardFront = null;
    indexSelected: number;
    @Input() isEditMode = false;
    flashcardDeck: FlashcardDeck;
    flashcardDecksSub: Subscription;
    editFlashcardSerSub: Subscription;
    cardForm: FormGroup;
    // @ViewChild('instructionsEl', {static: false}) instructionsEl: ElementRef<TextField>;
    // @ViewChild('questionEl', {static: false}) questionEl: ElementRef<TextView>;
    // @ViewChild('answerEl', {static: false}) answerEl: ElementRef<TextView>;


    get cardsControl() {
        if (this.isEditMode) {
            return (this.cardForm.get('_cards') as FormArray).controls;
        } else {
            return this.flashcardDeck._cards;
        }
    }

  constructor(
      private flashcardService: FlashcardService,
      private editFlashcardService: EditFlashcardService) { }

    ngOnInit() {
        if (this.onsaveFlashcardDeckEvent) {
            this.saveFlashcardDeckSub = this.onsaveFlashcardDeckEvent.subscribe(data => {
                this.saveFlashcardForm();
            });
        }

        if (this.isEditMode) {
            this.editFlashcardSerSub = this.editFlashcardService.cardAddedToDEckObserv.subscribe(onAddCardButton => {
                this.onAddCard();
            });
        }
        this.flashcardDecksSub = this.flashcardService._flashcardsChanged
        .subscribe((flashcardDecksData: FlashcardDeck[]) => {
            this.flashcardDeck = flashcardDecksData[this.flashcardDeckIndexSelected];
        });
        this.flashcardDeck = this.flashcardService.getAFlashcardDeck(this.flashcardDeckIndexSelected);

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
  }

  onSelectCard(index: number) {
    if (this.isEditMode) {
        // const selectedCardControl = (<FormArray>this.cardForm.get('cards'));
        if (this.indexSelected != null) {
            this.indexSelected = null;
        } else {
            this.indexSelected = index;
        }
        // this.flashcardDeck._cards[index].instruction = selectedCardControl.at(index).get('instruction').value;
        // this.flashcardDeck._cards[index].question = selectedCardControl.at(index).get('question').value;
        // this.flashcardDeck._cards[index].answer = selectedCardControl.at(index).get('answer').value;

        // this.cardForm['card'].patchValue({
        //     instruction: 'test',
        //     question: 'Walrus',
        //     answer: 'agian'
        // });



    }

  }

  onAddCard() {
      (<FormArray>this.cardForm.get('_cards')).push(
          new FormGroup({
            instruction: new FormControl(null, {updateOn: "change"}),
            question: new FormControl(null, {updateOn: "change"}),
            answer: new FormControl(null, { updateOn: "change"})
          })
      );
  }

  private initCardForm() {
      // used to test teh static data
      let testtitle = "this was chanegd for the staits ts file";
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
          title: new FormControl(testtitle, Validators.required),
          _cards: flashcardCards
      });

  }

  saveFlashcardForm() {
      // need to find a way to save the data maybe moove ^^^^^ up there down here somehow
      // bind the data from parent textfield componet and pass it as the title: nw form controler
      if (this.isEditMode) {
        this.flashcardService.updateFlashcardDecks(this.flashcardDeckIndexSelected, this.cardForm.value);
        console.log(this.cardForm.value);
      }
  }


  ngOnDestroy() {
    this.flashcardDecksSub.unsubscribe();
    if(this.isEditMode) {
        this.saveFlashcardDeckSub.unsubscribe();
        this.editFlashcardSerSub.unsubscribe();
    }

  }

}
