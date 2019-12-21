import { Component, OnInit, Input } from '@angular/core';
import * as applicationModule from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label"
import { EventData } from 'tns-core-modules/ui/page/page';

declare var android: any;

@Component({
  selector: 'ns-flashcard-cards',
  templateUrl: './flashcard-cards.component.html',
  styleUrls: ['./flashcard-cards.component.css']
})
export class FlashcardCardsComponent implements OnInit {
    cardFront = true;
    @Input() isEditMode = false;
    staticFlashcardJson = [
        {pk: 0, instuc: "transolate in English", question: "あ",answer: "A"},
        {pk: 1, instuc: "transolate in Japanese", question: "A",answer: "あ"},
        {pk: 2, instuc: "transolate in English", question: "ア",answer: "A"},
        {pk: 3, instuc: "transolate in English", question: "漢字",answer: "Kanji "},
        {pk: 4, instuc: "transolate漢字 in漢字 English", question: "漢字漢字漢字漢字漢漢漢漢字字字字",answer: "KanjiKanjiKanjiKanjiKanjiKanjiKanjiKanji"},
    ]

  constructor() { }

  ngOnInit() {
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


}
