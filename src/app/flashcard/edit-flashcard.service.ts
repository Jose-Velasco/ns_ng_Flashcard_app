import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class EditFlashcardService {
    private actionStatusToDeck = new Subject<string>();
    private aCardWasSelected = new Subject<boolean>();
    private createNewFlashcardDeck = new BehaviorSubject<boolean>(false);
    private shuffleDeckChanged = new Subject();

    get actionStatusToDeckObserv() {
        return this.actionStatusToDeck.asObservable();
    }

    get aCardWasSelectedObserv() {
        return this.aCardWasSelected.asObservable();
    }

    get getCreateNewFlashcardDeckObserv() {
        return this.createNewFlashcardDeck.asObservable();
    }

    get getshuffleDeckChanged() {
        return this.shuffleDeckChanged.asObservable();
    }

    updateDeckAction(addAction: string) {
        this.actionStatusToDeck.next(addAction);
    }

    onIsCardSelected(isCardSelected: boolean) {
        this.aCardWasSelected.next(isCardSelected);
    }

    enableCreateNewFlashcardDeck(isCreateMode: boolean) {
        this.createNewFlashcardDeck.next(isCreateMode);
    }

    ShufflingDeck() {
        this.shuffleDeckChanged.next();
    }

}
