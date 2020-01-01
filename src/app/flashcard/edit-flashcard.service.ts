import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Card } from "./card.model";

@Injectable({providedIn: 'root'})
export class EditFlashcardService {
    // might need to delte this i think ifixed bug with submmitng the form and  saving the data
    private cardAddedToDeck = new Subject();

    get cardAddedToDEckObserv() {
        return this.cardAddedToDeck.asObservable();
    }

    addCard() {
        this.cardAddedToDeck.next();
    }
}
