import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FlashcardDeck } from '../flashcard/flashcardDeck.model';
import { FlashcardService } from '../flashcard/flashcard.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: RouterExtensions, private flashcardService: FlashcardService) { }

  staticflashardData = [
    new FlashcardDeck("first ever deck!!!", [
        {instruction: "transolate in English", question: "あ",answer: "A"},
        {instruction: "transolate in Japanese", question: "A",answer: "あ"},
        {instruction: "transolate in English", question: "ア",answer: "A"},
        {instruction: "transolate in English", question: "漢字",answer: "Kanji "},
        {instruction: "transolate漢字 in漢字 English", question: "漢字漢字漢字漢字漢漢漢漢字字字字",answer: "KanjiKanjiKanjiKanjiKanjiKanjiKanjiKanji"},
    ]),
    new FlashcardDeck("Another onw!!!", [
        {instruction: "3333333onw!", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    new FlashcardDeck("this is deiffent", [
        {instruction: "do this !", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    new FlashcardDeck("A12333333", [
        {instruction: "not this doe!", question: "this is answer",answer: "A*****"},
        {instruction: "Another onw! in Another onw!", question: "A",answer: "あ"},
        {instruction: "Another onw! in Another onw!", question: "ア",answer: "A"},
        {instruction: "Another onw!", question: "xdxdxd",answer: "Kanji "},
        {instruction: "tAnother onw!", question: "xdxd字",answer: "second card dexck"},
    ]),
    ];

  ngOnInit() {
  }

  onLogin() {
      this.flashcardService.setFlascardDesks(this.staticflashardData);
    this.router.navigate(['/tabs'], {clearHistory: true});
  }

}
