import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageRoute } from 'nativescript-angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-flashcard-deck-viewer',
  templateUrl: './flashcard-deck-viewer.component.html',
  styleUrls: ['./flashcard-deck-viewer.component.css']
})
export class FlashcardDeckViewerComponent implements OnInit, OnDestroy {
    dynamicParamSelectedDeckIndex: number;
    pageRouteSub: Subscription


    constructor(
        private pageRoute: PageRoute) { }

    ngOnInit() {

        // this will always work matter if this page is loaded for the first time
        // or if it's coming from cache. used for nativeScript
        this.pageRouteSub = this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                this.dynamicParamSelectedDeckIndex = parseInt(paramMap.get('id'));
            })
        });
    }

    ngOnDestroy() {
        this.pageRouteSub.unsubscribe();
    }

}
