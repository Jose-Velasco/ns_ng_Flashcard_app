import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription, of, throwError } from "rxjs";
import { FlashcardDeck } from "./flashcardDeck.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { take, switchMap, tap, catchError } from "rxjs/operators";
import { Card } from "./card.model";

@Injectable ({providedIn: 'root'})
export class FlashcardService implements OnDestroy {
    _flashcardsChanged = new Subject<FlashcardDeck[]>();
    private flashcardDecksArray: FlashcardDeck[] = [];
    private userSub: Subscription;

    constructor(
        private http: HttpClient,
        private authService: AuthService
        ) {
            this.userSub = this.authService.user.subscribe(user => {
                if (!user) {
                    this.flashcardDecksArray = [];
                    this.setFlascardDesks([]);
                }
            });
        }

    setFlascardDesks(flashcardDecks: FlashcardDeck[]) {
        this.flashcardDecksArray = flashcardDecks;
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

    get flashcardsChanged() {
        return this._flashcardsChanged.asObservable();
    }

    getFlashcardDecks() {
        return this.flashcardDecksArray.slice();
    }
    getAFlashcardDeck(index: number) {
        return this.flashcardDecksArray[index];
    }

    get currentFlashcardDeckLength() {
        return this.flashcardDecksArray.length;
    }
    gethasCardsInDeck(index: number) {
        return this.flashcardDecksArray.slice()[index]._cards.length > 0;
    }

    addFlashcardDeck(flashcardDeck: FlashcardDeck) {
        this.createServerDeck(flashcardDeck).pipe(take(1))
            .subscribe(resData => {
                const LocalDeck = <FlashcardDeck>this.mapFlashcardDeckJSON(resData, true);
                this.flashcardDecksArray.push(LocalDeck);
                this._flashcardsChanged.next(this.flashcardDecksArray.slice());
            });

    }

    deleteFlashcardDeck(index: number) {
        let deletedCard = this.flashcardDecksArray.splice(index, 1);
        this.deleteServerDeck(deletedCard).pipe(take(1)).subscribe();
        this._flashcardsChanged.next(this.flashcardDecksArray.slice());
    }

    updateFlashcardDecks(index: number, newFlashcardDeck: FlashcardDeck) {

        this.editServerDeck(newFlashcardDeck, this.flashcardDecksArray[index].pk)
            .pipe(take(1))
            .subscribe(resData => {
                const newDeckRes: FlashcardDeck = <FlashcardDeck>this.mapFlashcardDeckJSON(resData,true);
                this.flashcardDecksArray[index] = newDeckRes;
                this._flashcardsChanged.next(this.flashcardDecksArray.slice());
            });

    }

    fetchFlashcardDecks() {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || ! currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<{
                    pk: number;
                    title: string;
                    flashcard: Card[];
                }[]>(
                    `${this.authService.baseUrl}/flashcardApi/flashcardDecks/`,
                    {headers: {
                        "Authorization": `token ${currentUser.token}`
                    }}
                )
            }),tap(resData => {
                const tempDeckArray: FlashcardDeck[] = [];
                if (resData) {
                    resData.forEach(deck => {
                        let tempDeck = new FlashcardDeck(
                            deck.pk,
                            deck.title,
                            deck.flashcard
                        );
                        tempDeckArray.push(tempDeck);
                    });
                    this.setFlascardDesks(tempDeckArray);
                }
            }), catchError(errorRes => {
                this.handleError(errorRes.error);
                return throwError(errorRes);
            })
        );
    }

    deleteServerDeck(deletedDeck: FlashcardDeck[]) {
        let primaryKeyDeck: number;
        deletedDeck.map(deck => {
            primaryKeyDeck = deck.pk;
        });

        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                const options = {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": `token ${currentUser.token}`,
                    }),
                };
                return this.http.delete(
                    this.authService.baseUrl + `/flashcardApi/flashcardDecks/${primaryKeyDeck}/`, options
                );
            }),catchError(errorRes => {
                this.handleError(errorRes.error);
                return throwError(errorRes);
            })
        );
    }

    createServerDeck(flashcardDeck: FlashcardDeck) {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }

                const httpHeaders = new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": `token ${currentUser.token}`,
                });

                const serverDeckFormat = this.mapFlashcardDeckJSON(
                    flashcardDeck,
                    false
                );
                const body = serverDeckFormat;

                return this.http.post(
                    this.authService.baseUrl + "/flashcardApi/flashcardDecks/",
                    body,
                    {headers: httpHeaders},
                );
            }), catchError(errorRes => {
                this.handleError(errorRes.error);
                return throwError(errorRes);
            })
        );
    }

    editServerDeck(newFlashcardDeck: FlashcardDeck, pk: number) {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || ! currentUser.isAuth) {
                    return of(null);
                }
                const httpHeaders = new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": `token ${currentUser.token}`,
                });
                const serverDeckFormat = this.mapFlashcardDeckJSON(
                    newFlashcardDeck,
                    false,
                    true,
                    pk
                );
                const body = serverDeckFormat;

                return this.http.put(
                    this.authService.baseUrl + "/flashcardApi/flashcardDecks/",
                    body,
                    {headers: httpHeaders}
                );
            }), catchError(errorRes => {
                this.handleError(errorRes.error);
                return throwError(errorRes);
            })
        )
    }

    private handleError(errorMessage) {
        if (errorMessage.detail == "Not found.") {
            alert("Error occurred while trying to delete flashcard deck");
        } else if (errorMessage == "Maximum of 46 card") {
            alert("Maximum of 46 cards");
        } else if (errorMessage = "Maximum of 15 decks") {
            alert("Maximum of 15 decks");
        } else {
            alert("An error has occurred.");
        }
    }

    /**
     * fixes/formats the deck structure to local or server key nameing format
     * @param flashcardDeck deck that is to be formatted
     * @param isComingFromServer returns: creates a new FlashcardDeck model using server response data
     * @param isPutRequest returns: formats the local deck model into serverside PUT compatible format
     * @param primaryKey returns: formats the local deck model into serverside POST compatible format
     */
    private mapFlashcardDeckJSON(
        flashcardDeck: any | FlashcardDeck,
        isComingFromServer: boolean,
        isPutRequest = false,
        primaryKey?: number) {
            if (isComingFromServer) {
                const newLocalDeck = new FlashcardDeck(
                    flashcardDeck.pk,
                    flashcardDeck.title,
                    flashcardDeck.flashcard
                );
                return newLocalDeck;
            } else {
                if (isPutRequest) {
                    const serverDeckFormat = {
                        "pk": primaryKey,
                        "title": flashcardDeck.title,
                        "flashcard": flashcardDeck._cards
                    };
                    return serverDeckFormat;
                }
                const serverDeckFormat = {
                    "title": flashcardDeck.title,
                    "flashcard": flashcardDeck._cards
                };
                return serverDeckFormat;
            }
    }


    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}
