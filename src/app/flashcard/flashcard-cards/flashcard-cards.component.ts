import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import * as applicationModule from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label"
import { EventData } from 'tns-core-modules/ui/page/page';
import { FlashcardService } from '../flashcard.service';
import { Subscription } from 'rxjs';
import { FlashcardDeck } from '../flashcardDeck.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EditFlashcardService } from '../edit-flashcard.service';
import { RouterExtensions } from 'nativescript-angular/router';

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
    // used to get textfield value form parent component
    // to be used to set current title of deck fomr control
    @Input() currentFlashcardDeckTitle: string;
    cardFront = null;
    indexSelected: number;
    isCardSelected: boolean;
    @Input() isEditMode = false;
    flashcardDeck: FlashcardDeck;
    flashcardDecksSub: Subscription;
    editFlashcardActionStatusSerSub: Subscription;
    editFlashcardUpdateCardIndexSelectedSerSub: Subscription;
    cardForm: FormGroup;


    get cardsControl() {
        if (this.isEditMode) {
            return (this.cardForm.get('_cards') as FormArray).controls;
        } else {
            return this.flashcardDeck._cards;
        }
    }

  constructor(
      private flashcardService: FlashcardService,
      private editFlashcardService: EditFlashcardService,
      private router: RouterExtensions) { }

    ngOnInit() {
        // used to when save buttton is clicked saves the current deck
        if (this.onsaveFlashcardDeckEvent) {
            this.saveFlashcardDeckSub = this.onsaveFlashcardDeckEvent.subscribe(data => {
                this.saveFlashcardForm();
            });
        }

        // used to determin whether to add a card or to delete a card seleceted
        if (this.isEditMode) {
            this.editFlashcardActionStatusSerSub = this.editFlashcardService.actionStatusToDeckObserv
                .subscribe((onActionEmitted: "add" | "delete") => {
                    if (onActionEmitted === "add") {
                        this.onAddCard();
                    } else {
                        this.deleteSelectedCard();
                    }
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
        // used to fix bug when a card is pressed for the first time the card was
        // not seleceted but after the first time it would work
        if (this.indexSelected != null) {
            this.indexSelected = null;
            this.isCardSelected = false;
        } else {
            this.isCardSelected = true;
            this.indexSelected = index;
        }
        this.editFlashcardService.onIsCardSelected(this.isCardSelected);
        this.isCardSelected = null;
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

  deleteSelectedCard() {
    if (this.indexSelected != null) {
        (<FormArray>this.cardForm.get('_cards')).removeAt(this.indexSelected);
        this.indexSelected = null;
        this.isCardSelected = false;
        this.editFlashcardService.onIsCardSelected(this.isCardSelected);
        this.isCardSelected = null;
    }
  }

  private initCardForm() {
      // used to test teh static data
      // if the flashcard deck has a title then use it
      // if it does not then just keep on using an empty string
      // (this might hav to be test  id null value breaks something)???
      if (this.flashcardDeck.title != "") {
        this.currentFlashcardDeckTitle = this.flashcardDeck.title;
      }
      let flashcardCards = new FormArray([]);
      // add if to make sure there is cards and not empty maybe?
      for (let card of this.flashcardDeck._cards) {
          flashcardCards.push(new FormGroup({
            instruction: new FormControl(card.instruction, {updateOn: "change"}),
            question: new FormControl(card.question, {updateOn: "change"}),
            answer: new FormControl(card.answer, { updateOn: "change"})
          }));
      }

      this.cardForm = new FormGroup({
          title: new FormControl(this.currentFlashcardDeckTitle, Validators.required),
          _cards: flashcardCards
      });
  }

  saveFlashcardForm() {
      // need to find a way to save the data maybe moove ^^^^^ up there down here somehow
      // bind the data from parent textfield componet and pass it as the title: nw form controler
      this.cardForm.value.title = this.currentFlashcardDeckTitle;
      if (this.isEditMode) {
        this.flashcardService.updateFlashcardDecks(this.flashcardDeckIndexSelected, this.cardForm.value);
        console.log(this.cardForm.value);
        this.router.backToPreviousPage();
      }
  }

  ngOnDestroy() {
    this.flashcardDecksSub.unsubscribe();
    if(this.isEditMode) {
        this.saveFlashcardDeckSub.unsubscribe();
        this.editFlashcardActionStatusSerSub.unsubscribe();
    }
  }

}
