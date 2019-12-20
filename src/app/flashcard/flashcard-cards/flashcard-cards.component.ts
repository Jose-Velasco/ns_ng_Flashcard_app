import { Component, OnInit } from '@angular/core';
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

  get android() {
    return isAndroid;
}

  onFlip() {
      // used to play the click sound when flexbox is clicked
      if (isAndroid) {
          let decorView: any = applicationModule.android.startActivity.getWindow().getDecorView()
          decorView.playSoundEffect(android.view.SoundEffectConstants.CLICK);
      }
      console.log("Card was fliped!");
  }

}
