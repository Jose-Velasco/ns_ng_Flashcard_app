import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class EditFlashcardService {
    private actionStatusToDeck = new Subject<string>();
    private aCardWasSelected = new Subject<boolean>();

    get actionStatusToDeckObserv() {
        return this.actionStatusToDeck.asObservable();
    }

    get aCardWasSelectedObserv() {
        return this.aCardWasSelected.asObservable();
    }

    updateDeckAction(addAction: string) {
        this.actionStatusToDeck.next(addAction);
    }

    onIsCardSelected(isCardSelected: boolean) {
        this.aCardWasSelected.next(isCardSelected);
    }
}
