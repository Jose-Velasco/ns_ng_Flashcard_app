import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FlashcardDeck } from "./flashcardDeck.model";

@Injectable ({providedIn: 'root'})
export class FlashcardService {
    flashcardsChanged = new Subject<FlashcardDeck[]>();
    // private flashcardDecks: FlashcardDeck[] = [];
    // private flashcardDecks: FlashcardDeck[] = [
    //     {pk: 0, instuc: "transolate in English", question: "あ",answer: "A"},
    //     {pk: 1, instuc: "transolate in Japanese", question: "A",answer: "あ"},
    //     {pk: 2, instuc: "transolate in English", question: "ア",answer: "A"},
    //     {pk: 3, instuc: "transolate in English", question: "漢字",answer: "Kanji "},
    //     {pk: 4, instuc: "transolate漢字 in漢字 English", question: "漢字漢字漢字漢字漢漢漢漢字字字字",answer: "KanjiKanjiKanjiKanjiKanjiKanjiKanjiKanji"},
    // ];
    private flashcardDecks: FlashcardDeck[] = [
        new FlashcardDeck("first ever deck!!!", [
            {instruction: "transolate in English", question: "あ",answer: "A"},
            {instruction: "transolate in Japanese", question: "A",answer: "あ"},
            {instruction: "transolate in English", question: "ア",answer: "A"},
            {instruction: "transolate in English", question: "漢字",answer: "Kanji "},
            {instruction: "transolate漢字 in漢字 English", question: "漢字漢字漢字漢字漢漢漢漢字字字字",answer: "KanjiKanjiKanjiKanjiKanjiKanjiKanjiKanji"},
        ]),
    ];

    getFlashcardDecks() {
        return this.flashcardDecks.slice();
    }
    getAFlashcardDeck(index: number) {
        return this.flashcardDecks[index];
    }

}
